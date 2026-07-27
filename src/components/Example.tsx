import React, { useMemo } from "react"
import SEO from "./SEO"
import Html from "./Html"
import Toc from "./Toc"
import SplitContent from "./SplitContent"
import styles from "./Example.module.css"

interface Path {
  title: string
  path: string
}

interface Props {
  title: string
  description: string
  version: string
  html: string
  githubLink?: string
  githubLabel?: string
  prev: Path | null
  next: Path | null
  // "split" pairs prose with a sticky code column; "guide" is single-column
  // with a right-rail TOC. Omit to pick automatically from code density.
  layout?: "split" | "guide"
}

const Example: React.FC<Props> = ({
  title,
  version,
  description,
  githubLink,
  githubLabel,
  html,
  prev,
  next,
  layout,
}) => {
  // Most pages here carry only 1–2 short snippets; a sticky code rail on those
  // would just be an empty column. Only pages that are genuinely code-led split.
  const split = useMemo(() => {
    if (layout) {
      return layout == "split"
    }
    return (html.match(/<pre[\s>]/g) || []).length >= 2
  }, [html, layout])

  return (
    <div className={styles.component}>
      <SEO
        title={`${title} | STRK20 by Example`}
        description={description}
        githubLink={githubLink}
      />
      <div className={split ? styles.bodyWide : styles.body}>
        <div className={styles.content} data-toc-root>
          <h1 className={styles.title}>{title}</h1>

          {githubLink ? (
            <div className={styles.sourceLink}>
              View the full source in the{" "}
              <a href={githubLink} target="_blank" rel="noopener noreferrer">
                {githubLabel || "starknet-privacy repo"}
              </a>
            </div>
          ) : null}

          {split ? <SplitContent html={html} /> : <Html html={html} />}

          <nav className={styles.prevNext} aria-label="Previous and next pages">
            {prev ? (
              <a href={prev.path} className={styles.prevLink}>
                <span className={styles.pagerLabel}>&larr; Previous</span>
                <span className={styles.pagerTitle}>{prev.title}</span>
              </a>
            ) : (
              <span />
            )}
            {next ? (
              <a href={next.path} className={styles.nextLink}>
                <span className={styles.pagerLabel}>Next &rarr;</span>
                <span className={styles.pagerTitle}>{next.title}</span>
              </a>
            ) : (
              <span />
            )}
          </nav>
        </div>

        {/* the code column and the TOC both claim the right rail */}
        {split ? null : <Toc />}
      </div>
    </div>
  )
}

export default Example
