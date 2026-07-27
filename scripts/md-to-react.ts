import assert from "assert"
import fs from "fs"
import path from "path"
import mustache from "mustache"
import { marked } from "marked"
import { markedHighlight } from "marked-highlight"
import hljs from "highlight.js"
import {
  exists,
  removeExt,
  getExt,
  renderTemplateToFile,
  parseYaml,
  getFiles,
} from "./lib"

const { readFile, readdir } = fs.promises

marked.use(
  markedHighlight({
    highlight: (code, lang) => {
      let language = lang
      // text
      if (lang == "") {
        language = "plaintext"
      }
      // Cairo 2 is Rust-shaped - use the rust grammar
      else if (lang === "cairo") {
        language = "rust"
      }
      return hljs.highlight(code, { language }).value
    },
  }),
)

// Slugged heading ids + anchor links. marked 14 dropped default header ids,
// so headings rendered as bare <h2> with nothing for the right-rail TOC or a
// shared deep link to target. Reset per page via resetSlugs().
const slugCount = new Map<string, number>()

function resetSlugs() {
  slugCount.clear()
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      // strip any inline html the heading picked up (e.g. <code>)
      .replace(/<[^>]*>/g, "")
      .replace(/&[a-z]+;/g, "")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") || "section"
  )
}

marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const inner = this.parser.parseInline(tokens)
      const base = slugify(inner)
      const seen = slugCount.get(base) ?? 0
      slugCount.set(base, seen + 1)
      const id = seen === 0 ? base : `${base}-${seen}`

      return `<h${depth} id="${id}">${inner}<a class="anchor" href="#${id}" aria-label="Link to this section">#</a></h${depth}>\n`
    },
  },
})

async function findCodeFiles(dir: string): Promise<string[]> {
  const files = await readdir(dir)
  return files.filter((file) => file.split(".").pop() == "cairo")
}

async function mdToHtml(filePath: string) {
  const folders = filePath.split("/")
  const tail = folders.pop()

  const ext = getExt(tail)
  assert(ext === "md", `Expected md file, got ${tail}`)

  const fileName = removeExt(tail)
  const dir = folders.join("/")

  // get cairo code
  const codeFileNames = await findCodeFiles(dir)

  const codes: { [key: string]: string } = {}
  const fileNames: { [key: string]: string } = {}
  for (const codeFileName of codeFileNames) {
    const source = (await readFile(path.join(dir, codeFileName))).toString()
    codes[removeExt(codeFileName)] = source
    fileNames[removeExt(codeFileName)] = codeFileName
  }

  // render code inside markdown
  const { content, metadata } = await parseYaml(filePath)

  const markdown = mustache.render(content, codes)
  resetSlugs()
  const html = (await marked.parse(markdown))
    .replace(/&quot;/g, `"`)
    // replace \ with \\
    .replace(/\\/g, `\\\\`)
    // escape back ticks and ${ - html is embedded in a template literal.
    // TypeScript snippets contain both and would break the generated file.
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${")

  // render markdown to html
  await renderTemplateToFile(
    path.join(__dirname, "./template/index.html.ts.mustache"),
    path.join(dir, `${fileName}.html.ts`),
    {
      html,
      title: metadata.title,
      version: metadata.version,
      description: metadata.description,
      keywords: metadata.keywords,
      githubLink: metadata.githubLink || "",
      githubLabel: metadata.githubLabel || "",
      codes: Object.entries(codes).map(([key, val]) => ({
        key: fileNames[key],
        val: Buffer.from(val).toString("base64"),
      })),
    },
  )
}

function getImportPathToExample(dir: string): string {
  const folders = dir.split("/")

  const start = folders.findIndex((folder) => folder === "src")
  if (start === -1) {
    throw new Error(`Cannot find src`)
  }

  const depth = folders.length - (start + 1)

  return path.join("../".repeat(depth), "components/Example")
}

function removeTrailingSlash(dir: string): string {
  if (dir[dir.length - 1] === "/") {
    return dir.slice(0, -1)
  }
  return dir
}

async function renderPage(dir: string) {
  const mdPath = path.join(dir, "index.md")

  if (!(await exists(mdPath))) {
    console.log(`Skip ${mdPath} does not exist`)
    return
  }

  await mdToHtml(mdPath)

  // create index.tsx
  await renderTemplateToFile(
    path.join(__dirname, "./template/index.tsx.mustache"),
    path.join(dir, `index.tsx`),
    {
      importPathToExample: getImportPathToExample(dir),
    },
  )
}

async function main() {
  const args = process.argv.slice(2)

  if (args[0] === "--all") {
    const pagesDir = path.join(__dirname, "..", "src/pages")
    const mdFiles = await getFiles(pagesDir, new RegExp("^index\\.md$"))
    for (const mdFile of mdFiles) {
      await renderPage(path.dirname(mdFile))
    }
    return
  }

  await renderPage(removeTrailingSlash(args[0]))
}

main()
