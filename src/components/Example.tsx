import React from "react"
import { useLocation } from "react-router-dom"
import SEO from "./SEO"
import Html from "./Html"
import Toc from "./Toc"
import PageActions from "./PageActions"
import InteractiveEmbed from "./InteractiveEmbed"
import styles from "./Example.module.css"
import { ROUTES_BY_CATEGORY, getCategoryIndexByPath } from "../nav"
import { withBase } from "../lib/url"

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
  markdown?: string
  prev: Path | null
  next: Path | null
}

const Example: React.FC<Props> = ({
  title,
  version,
  description,
  githubLink,
  githubLabel,
  html,
  markdown,
  prev,
  next,
}) => {
  const location = useLocation()
  const category = ROUTES_BY_CATEGORY[getCategoryIndexByPath(location.pathname)]
  // The introduction *is* home, so "Home / Concepts / Introduction" would be
  // three names for where you already are.
  const isHome = location.pathname == "/"
  return (
    <div className={styles.component}>
      <SEO
        title={`${title} | STRK20 by Example`}
        description={description}
        githubLink={githubLink}
      />
      <div className={styles.body}>
        <div className={styles.content} data-toc-root>
          {isHome ? null : (
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <a href={withBase("/")}>Home</a>
              {category ? (
                <>
                  <span className={styles.crumbSep}>/</span>
                  <span>{category.tab}</span>
                </>
              ) : null}
              <span className={styles.crumbSep}>/</span>
              <span className={styles.crumbCurrent}>{title}</span>
            </nav>
          )}

          <h1 className={styles.title}>{title}</h1>
          {description ? <p className={styles.subtitle}>{description}</p> : null}

          {markdown ? <PageActions title={title} markdown={markdown} /> : null}

          {/* Introduction only: on a page about notes and nullifiers the
              playground is a distraction, not a way in. */}
          {isHome ? <InteractiveEmbed /> : null}

          {githubLink ? (
            <div className={styles.sourceLink}>
              View the full source in the{" "}
              <a href={githubLink} target="_blank" rel="noopener noreferrer">
                {githubLabel || "starknet-privacy repo"}
              </a>
            </div>
          ) : null}

          <Html html={html} />

          <nav className={styles.prevNext} aria-label="Previous and next pages">
            {prev ? (
              <a href={withBase(prev.path)} className={styles.prevLink}>
                <span className={styles.pagerLabel}>&larr; Previous</span>
                <span className={styles.pagerTitle}>{prev.title}</span>
              </a>
            ) : (
              <span />
            )}
            {next ? (
              <a href={withBase(next.path)} className={styles.nextLink}>
                <span className={styles.pagerLabel}>Next &rarr;</span>
                <span className={styles.pagerTitle}>{next.title}</span>
              </a>
            ) : (
              <span />
            )}
          </nav>
        </div>

        <Toc />
      </div>
    </div>
  )
}

export default Example
