import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import Sparkle from "./svg/Sparkle"
import styles from "./PageActions.module.css"
import { withBase } from "../lib/url"

interface Props {
  title: string
  markdown: string
}

// The build publishes every page's source at a stable path (see
// scripts/build-agent-files.ts), so this is a real URL a reader can share and
// an agent can fetch — not the blob it used to be, which existed only inside
// one browser tab.
function markdownUrl(pathname: string): string {
  const rel = pathname == "/" ? "/index.md" : `${pathname.replace(/\/$/, "")}.md`
  return withBase(rel)
}

// The row under the page title: hand the page to an assistant, or take it
// away as markdown. All three work off the raw markdown the build emits
// alongside the rendered html.
const PageActions: React.FC<Props> = ({ title, markdown }) => {
  const [copied, setCopied] = useState(false)
  const location = useLocation()
  const mdUrl = markdownUrl(location.pathname)

  function askAboutPage() {
    const prompt = `I'm reading the STRK20 (Starknet Privacy) docs page "${title}" at ${window.location.href}. Help me understand it:\n\n${markdown.slice(0, 6000)}`
    window.open(
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  async function copyForLlm() {
    try {
      await navigator.clipboard.writeText(
        `# ${title}\nSource: ${window.location.href}\n\n${markdown}`,
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.component}>
      <button className={styles.action} onClick={askAboutPage}>
        <Sparkle size={12} className={styles.icon} />
        Ask about this page
      </button>

      <span className={styles.divider} />

      <button className={styles.action} onClick={copyForLlm}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.icon}
          aria-hidden="true"
        >
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        {copied ? "Copied" : "Copy for LLM"}
      </button>

      <span className={styles.divider} />

      <a
        className={styles.action}
        href={mdUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={styles.icon}
          aria-hidden="true"
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M6 15V9l3 3 3-3v6M17 9v4m0 0 2-2m-2 2-2-2" />
        </svg>
        View as Markdown
      </a>
    </div>
  )
}

export default PageActions
