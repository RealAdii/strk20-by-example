// Emits the agent-readable surface of the site into public/, so it is served
// in dev and copied into build/ for production:
//
//   <route>.md      the raw markdown for every page, at a stable URL
//   llms.txt        an index: one line per page, with its .md link
//   llms-full.txt   every page concatenated, so one fetch gets the whole site
//   sitemap.xml     every route
//   robots.txt      explicit allows for the agent crawlers, plus the sitemap
//
// This exists because the site is a client-rendered SPA: fetching /what-is-strk20
// without JavaScript returns ~2.5KB of shell and none of the prose. Rather than
// add SSR for the sake of crawlers, publish the source these pages are built
// from, which we already have in the pipeline.

import fs from "fs"
import path from "path"
import mustache from "mustache"

import { getFiles, parseYaml, buildRoute, removeExt, Metadata } from "./lib"

const { readFile, readdir, writeFile, mkdir } = fs.promises

const ROOT = path.join(__dirname, "..")
const PAGES_DIR = path.join(ROOT, "src/pages")
const OUT_DIR = path.join(ROOT, "public")

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(path.join(ROOT, "package.json"))
const SITE_URL: string = (process.env.SITE_URL || pkg.homepage || "").replace(/\/$/, "")

interface Page {
  route: string // "/" | "/sdk/transfer"
  mdPath: string // "index.md" | "sdk/transfer.md"
  markdown: string
  metadata: Metadata
}

// Same substitution md-to-react does, so the published markdown contains the
// contract source rather than the mustache placeholders.
async function renderMarkdown(mdFile: string): Promise<string> {
  const dir = path.dirname(mdFile)
  const files = await readdir(dir)

  const codes: { [key: string]: string } = {}
  for (const file of files.filter((f) => f.split(".").pop() == "cairo")) {
    codes[removeExt(file)] = (await readFile(path.join(dir, file))).toString()
  }

  const { content } = await parseYaml(mdFile)
  return mustache.render(content, codes).trim()
}

async function collectPages(): Promise<Page[]> {
  const files = await getFiles(PAGES_DIR, new RegExp("index.md$"))

  const pages: Page[] = []
  for (const mdFile of files) {
    const { metadata } = await parseYaml(mdFile)
    const route = buildRoute(mdFile.split("/"))

    pages.push({
      route,
      // "/" is the introduction, and it cannot be "/.md"
      mdPath: route == "/" ? "index.md" : `${route.replace(/^\//, "")}.md`,
      markdown: await renderMarkdown(mdFile),
      metadata,
    })
  }

  // Introduction first, then alphabetically — a stable, readable order without
  // importing the app's nav module into a build script.
  return pages.sort((a, b) => {
    if (a.route == "/") return -1
    if (b.route == "/") return 1
    return a.route.localeCompare(b.route)
  })
}

async function write(relPath: string, contents: string) {
  const dest = path.join(OUT_DIR, relPath)
  await mkdir(path.dirname(dest), { recursive: true })
  await writeFile(dest, contents)
  console.log(`wrote public/${relPath}`)
}

async function main() {
  const pages = await collectPages()

  // 1. raw markdown per page
  for (const page of pages) {
    await write(
      page.mdPath,
      `# ${page.metadata.title}\n\n> ${page.metadata.description}\n\n` +
        `Source: ${SITE_URL}${page.route}\n\n${page.markdown}\n`,
    )
  }

  // 2. llms.txt — the index
  const index = [
    `# STRK20 by Example`,
    ``,
    `> Learn Starknet Privacy (STRK20) with small, runnable examples. Private`,
    `> transfers on a public chain, Cairo anonymizer contracts, and the`,
    `> wallet-builder SDK.`,
    ``,
    `This site is a client-rendered app, so fetch the .md files below rather`,
    `than the HTML routes. ${SITE_URL}/llms-full.txt has every page in one file.`,
    ``,
    `## Pages`,
    ``,
    ...pages.map(
      (p) =>
        `- [${p.metadata.title}](${SITE_URL}/${p.mdPath}): ${p.metadata.description}`,
    ),
    ``,
  ].join("\n")
  await write("llms.txt", index)

  // 3. llms-full.txt — everything, one fetch
  const full = [
    `# STRK20 by Example — full text`,
    ``,
    `Every page of ${SITE_URL}, concatenated. Generated at build time.`,
    ``,
    ...pages.map((p) =>
      [
        `${"=".repeat(72)}`,
        `# ${p.metadata.title}`,
        `URL: ${SITE_URL}${p.route}`,
        `${"=".repeat(72)}`,
        ``,
        p.markdown,
        ``,
      ].join("\n"),
    ),
  ].join("\n")
  await write("llms-full.txt", full)

  // 4. sitemap.xml
  const sitemap = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...pages.map((p) =>
      [
        `  <url>`,
        `    <loc>${SITE_URL}${p.route}</loc>`,
        `    <priority>${p.route == "/" ? "1.0" : "0.8"}</priority>`,
        `  </url>`,
      ].join("\n"),
    ),
    `</urlset>`,
    ``,
  ].join("\n")
  await write("sitemap.xml", sitemap)

  // 5. robots.txt
  const agents = [
    "GPTBot",
    "ClaudeBot",
    "Claude-Web",
    "PerplexityBot",
    "Google-Extended",
  ]
  const robots = [
    `User-agent: *`,
    `Allow: /`,
    ``,
    `# Explicitly welcome the agent crawlers.`,
    ...agents.flatMap((a) => [`User-agent: ${a}`, `Allow: /`, ``]),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    ``,
  ].join("\n")
  await write("robots.txt", robots)

  console.log(`\n${pages.length} pages published for agents`)
}

main()
