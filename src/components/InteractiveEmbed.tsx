import React, { useEffect, useState } from "react"
import styles from "./InteractiveEmbed.module.css"

const SRC = "https://strk20.starknet.io/interactive"

// The live playground, embedded on the introduction so the site can be played
// with before it has to be read. One iframe, whose container swaps class on
// expand: remounting it would reload the playground and throw away whatever
// the reader had set up.
const InteractiveEmbed: React.FC = () => {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!expanded) {
      return
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key == "Escape") {
        setExpanded(false)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [expanded])

  return (
    <div className={expanded ? styles.wrapExpanded : styles.wrap}>
      <div className={styles.bar}>
        <span className={styles.label}>
          <span className={styles.tick}>◢</span> Try it live
        </span>

        <a
          className={styles.newTab}
          href={SRC}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in new tab
        </a>

        <button
          className={styles.expand}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          title={expanded ? "Collapse (Esc)" : "Expand"}
          aria-label={expanded ? "Collapse playground" : "Expand playground"}
        >
          {expanded ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M9 3H3v6M15 21h6v-6M3 15v6h6M21 9V3h-6" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 9V3h6M21 15v6h-6M15 3h6v6M9 21H3v-6" />
            </svg>
          )}
        </button>
      </div>

      <iframe
        className={styles.frame}
        src={SRC}
        title="STRK20 interactive playground"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

export default InteractiveEmbed
