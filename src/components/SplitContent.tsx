import React, { useMemo } from "react"
import useCopy from "../hooks/useCopy"
import styles from "./SplitContent.module.css"

interface Section {
  prose: string
  code: string
}

// Split the generated page HTML into <h2>-delimited sections, separating each
// section's code blocks from its prose. Done here rather than in the markdown
// pipeline so the generated index.html.ts files (and their template-literal
// escaping) stay untouched.
export function splitSections(html: string): Section[] {
  const doc = new DOMParser().parseFromString(html, "text/html")
  const sections: Section[] = []
  let current: Section = { prose: "", code: "" }

  function push() {
    if (current.prose.trim() || current.code) {
      sections.push(current)
    }
  }

  for (const node of Array.from(doc.body.childNodes)) {
    const isElement = node.nodeType == 1
    const el = node as HTMLElement

    if (isElement && el.tagName == "H2") {
      push()
      current = { prose: "", code: "" }
    }

    if (isElement && (el.tagName == "PRE" || el.classList.contains("copy-wrapper"))) {
      current.code += el.outerHTML
    } else if (isElement) {
      current.prose += el.outerHTML
    } else {
      current.prose += node.textContent || ""
    }
  }
  push()

  return sections
}

interface Props {
  html: string
}

const SplitContent: React.FC<Props> = ({ html }) => {
  const sections = useMemo(() => splitSections(html), [html])

  // useCopy scans the document for <pre>, so it decorates these the same way
  // it does the single-column layout.
  useCopy([])

  return (
    <div className={styles.sections}>
      {sections.map((section, i) => (
        <section className={section.code ? styles.section : styles.sectionWide} key={i}>
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: section.prose }}
          />
          {section.code ? (
            <div className={styles.code}>
              <div dangerouslySetInnerHTML={{ __html: section.code }} />
            </div>
          ) : null}
        </section>
      ))}
    </div>
  )
}

export default SplitContent
