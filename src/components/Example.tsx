import React, { useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import Grainient from "./Grainient"
import SEO from "./SEO"
import Html from "./Html"
import Toc from "./Toc"
import SplitContent from "./SplitContent"
import PageActions from "./PageActions"
import styles from "./Example.module.css"
import { ROUTES_BY_CATEGORY, getCategoryIndexByPath } from "../nav"

// One accent, always orange: a light tint, the accent, and the deep warm base
// from the brand tokens so the wash resolves into the near-black canvas.
const HERO_LIGHT = "#ff6a33"
const HERO_ACCENT = "#c53400"
const HERO_BASE = "#1a0a04"

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
  markdown,
  prev,
  next,
  layout,
}) => {
  const location = useLocation()
  const category = ROUTES_BY_CATEGORY[getCategoryIndexByPath(location.pathname)]
  // The introduction *is* home, so "Home / Concepts / Introduction" would be
  // three names for where you already are.
  const isHome = location.pathname == "/"

  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
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
          {isHome ? (
            /* the brand's WebGL wash, kept as a contained band on the one page
               that is also the landing page */
            <div className={styles.banner} aria-hidden="true">
              <Grainient
                className={styles.bannerShader}
                color1={HERO_LIGHT}
                color2={HERO_ACCENT}
                color3={HERO_BASE}
                timeSpeed={0.1}
                colorBalance={0.12}
                warpFrequency={4}
                warpSpeed={1}
                warpAmplitude={70}
                blendAngle={18}
                blendSoftness={0.18}
                rotationAmount={200}
                noiseScale={1.5}
                grainAmount={0.07}
                contrast={1.15}
                zoom={1}
                paused={reducedMotion}
              />
              <div className={styles.bannerScrim} />
            </div>
          ) : (
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <a href="/">Home</a>
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
