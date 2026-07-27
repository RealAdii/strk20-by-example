import React, { useEffect, useRef, useState } from "react"
import Sparkle from "./svg/Sparkle"
import styles from "./AskAi.module.css"

// There is no assistant backend behind this site, so rather than mock a chat
// panel these are two things that actually work: hand the page to an
// assistant, or copy it in a form an assistant can read.
const AskAi: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key == "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  function pageTitle(): string {
    const h1 = document.querySelector("[data-toc-root] h1")
    return (h1?.textContent || document.title || "STRK20 by Example").trim()
  }

  function pageText(): string {
    const root = document.querySelector("[data-toc-root]")
    return (root?.textContent || "").replace(/\n{3,}/g, "\n\n").trim()
  }

  function askClaude() {
    const prompt = `I'm reading the STRK20 (Starknet Privacy) docs page "${pageTitle()}" at ${window.location.href}. Help me understand it:\n\n${pageText().slice(0, 6000)}`
    window.open(
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
      "_blank",
      "noopener,noreferrer",
    )
    setOpen(false)
  }

  async function copyForLlm() {
    try {
      await navigator.clipboard.writeText(
        `# ${pageTitle()}\nSource: ${window.location.href}\n\n${pageText()}`,
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        className={open ? styles.buttonOpen : styles.button}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        title="Ask AI about this page"
      >
        <span className={styles.label}>Ask AI</span>
        <Sparkle size={13} className={styles.sparkle} />
      </button>

      {open ? (
        <div className={styles.menu} role="menu">
          <button className={styles.item} onClick={askClaude} role="menuitem">
            <span className={styles.itemTitle}>Ask Claude about this page</span>
            <span className={styles.itemHint}>Opens claude.ai with the page ↗</span>
          </button>
          <button className={styles.item} onClick={copyForLlm} role="menuitem">
            <span className={styles.itemTitle}>
              {copied ? "Copied" : "Copy page for LLM"}
            </span>
            <span className={styles.itemHint}>
              Plain text, ready to paste into any assistant
            </span>
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default AskAi
