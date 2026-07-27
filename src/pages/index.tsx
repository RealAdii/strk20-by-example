import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import SEO from "../components/SEO"
import SearchBar from "../components/SearchBar"
import Strk20 from "../components/svg/Strk20"
import GradientBlinds from "../components/GradientBlinds"
import { useAppContext } from "../contexts/AppContext"
import useDebounce from "../hooks/useDebounce"
import { search, unique } from "../lib/search"
import styles from "./index.module.css"
import { ROUTES, ROUTES_BY_CATEGORY } from "../nav"

// Micro/meta copy reads like a filing (brand voice).
const UPDATES = ["Release · 2026.07.08", "Status · Live"]

// One accent, always orange — the brand's rule. These are tints of #c53400
// rather than a second hue. Module-level so the identity is stable: the
// shader's effect re-creates the WebGL context whenever this array changes.
const HERO_GRADIENT = ["#7a1f00", "#c53400", "#ff6a33"]

export default function HomePage() {
  const { state } = useAppContext()
  const [query, setQuery] = useState("")
  const [reducedMotion, setReducedMotion] = useState(false)
  // Don't spin up a WebGL context on phones just for hero decoration.
  const [wideEnough, setWideEnough] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const wide = window.matchMedia("(min-width: 768px)")
    setReducedMotion(motion.matches)
    setWideEnough(wide.matches)

    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    const onWide = (e: MediaQueryListEvent) => setWideEnough(e.matches)
    motion.addEventListener("change", onMotion)
    wide.addEventListener("change", onWide)
    return () => {
      motion.removeEventListener("change", onMotion)
      wide.removeEventListener("change", onWide)
    }
  }, [])
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchResults, setSearchResults] = useState<{
    [key: string]: boolean
  } | null>(null)

  useEffect(() => {
    const q = searchParams.get("q")
    if (q != null && q.length > 0) {
      setQuery(q)
      _search(q, false)
    }
  }, [])

  function _search(query: string, save: boolean) {
    const q = query.trim()

    if (q.length == 0) {
      setSearchResults(null)
      if (save) {
        setSearchParams({ q: "" })
      }
      return
    }

    const words = unique(q.split(" "))
    const pages: { [key: string]: boolean } = {}

    for (const word of words) {
      const res = search(word)
      for (const page of res) {
        pages[page] = true
      }
    }

    setSearchResults(pages)
    if (save) {
      setSearchParams({ q })
    }
  }

  const _searchWithDelay = useDebounce((query: string) => _search(query, true), 500, [])

  function onChangeSearchQuery(query: string) {
    setQuery(query)
    _searchWithDelay(query)
  }

  function renderLinks() {
    if (searchResults) {
      if (Object.keys(searchResults).length == 0) {
        return <div className={styles.noResults}>No results</div>
      }

      return (
        <ul className={styles.searchResultList}>
          {ROUTES.filter(({ path }) => searchResults[path]).map(({ path, title }) => (
            <li className={styles.listItem} key={path}>
              <a href={path}>{title}</a>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className={styles.grid}>
        {ROUTES_BY_CATEGORY.map(({ routes = [], groups = [], title }, i) => (
          <section className={styles.card} key={i}>
            <span className={styles.ghostNum} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.category}>{title || "Concepts"}</h3>

            {routes.length > 0 && (
              <ul className={styles.list}>
                {routes.map(({ path, title }) => (
                  <li className={styles.listItem} key={path}>
                    <a href={path}>{title}</a>
                  </li>
                ))}
              </ul>
            )}

            {groups.map((group) => (
              <div key={group.title}>
                <h4 className={styles.groupTitle}>{group.title}</h4>
                <ul className={styles.list}>
                  {group.routes.map(({ path, title }) => (
                    <li className={styles.listItem} key={path}>
                      <a href={path}>{title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.component}>
      <SEO
        title="STRK20 by Example"
        description="Learn Starknet Privacy (STRK20) with simple examples - privacy pools, notes and nullifiers, viewing keys, the Starknet Wallet API, anonymizer contracts, and wallet-builder SDK flows"
      />
      <div className={styles.hero}>
        {/* brand.md calls for a WebGL wash tinted #c53400 behind a darkening
            scrim on hero surfaces. Dark only: the 'lighten' blend has nothing
            to lift on the warm-paper canvas. */}
        {state.theme == "dark" && wideEnough ? (
          <div className={styles.heroShader} aria-hidden="true">
            <GradientBlinds
              gradientColors={HERO_GRADIENT}
              angle={20}
              noise={0.12}
              blindCount={14}
              blindMinWidth={56}
              spotlightRadius={0.62}
              spotlightSoftness={1.35}
              spotlightOpacity={0.85}
              mouseDampening={0.22}
              distortAmount={0.6}
              shineDirection="left"
              mixBlendMode="lighten"
              paused={reducedMotion}
              dpr={Math.min(
                typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
                1.5,
              )}
            />
            <div className={styles.heroScrim} />
          </div>
        ) : null}
        <h1 className={styles.header}>
          <a href="/" className={styles.headerLink}>
            <Strk20 size={64} className={styles.heroLogo} />
            <span className={styles.byExample}>by Example</span>
          </a>
        </h1>
        <div className={styles.subHeader}>
          <span className={styles.tick}>◢</span> Starknet Privacy
        </div>
        <p className={styles.intro}>
          An introduction to{" "}
          <a href="https://docs.starknet.io/build/starknet-privacy/overview">
            Starknet Privacy
          </a>{" "}
          with simple examples: private transfers on a public chain, the Starknet Wallet
          API, Cairo anonymizer contracts, and wallet-builder SDK flows.
        </p>

        <div className={styles.updates}>
          <span className={styles.statusDot} aria-hidden="true" />
          {UPDATES.join("  /  ")}
        </div>

        <div className={styles.search}>
          <SearchBar value={query} onChange={onChangeSearchQuery} />
        </div>
      </div>

      {renderLinks()}
    </div>
  )
}
