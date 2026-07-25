import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import SEO from "../components/SEO"
import SearchBar from "../components/SearchBar"
import Strk20 from "../components/svg/Strk20"
import useDebounce from "../hooks/useDebounce"
import { search, unique } from "../lib/search"
import styles from "./index.module.css"
import { ROUTES, ROUTES_BY_CATEGORY } from "../nav"

// Micro/meta copy reads like a filing (brand voice).
const UPDATES = ["Release · 2026.07.08", "Status · Live"]

export default function HomePage() {
  const [query, setQuery] = useState("")
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
