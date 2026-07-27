import React, { useEffect, useMemo, useRef, useState } from "react"
import { search, unique } from "../lib/search"
import { ROUTES, ROUTES_BY_CATEGORY, Route } from "../nav"
import Search from "./svg/Search"
import styles from "./SearchOverlay.module.css"

// path -> the section it lives under, for the result breadcrumb
const SECTION_BY_PATH: { [path: string]: string } = {}
for (const { title, routes = [], groups = [] } of ROUTES_BY_CATEGORY) {
  const label = (title || "Concepts").split("\n").join(" ")
  for (const r of routes) {
    SECTION_BY_PATH[r.path] = label
  }
  for (const group of groups) {
    for (const r of group.routes) {
      SECTION_BY_PATH[r.path] = group.title
    }
  }
}

interface Props {
  open: boolean
  onClose: () => void
}

const SearchOverlay: React.FC<Props> = ({ open, onClose }) => {
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const results: Route[] = useMemo(() => {
    const q = query.trim()
    if (q.length == 0) {
      return []
    }

    const hits: { [path: string]: boolean } = {}
    for (const word of unique(q.split(/\s+/))) {
      for (const path of search(word)) {
        hits[path] = true
      }
    }
    // ROUTES order keeps results in reading order rather than index order
    return ROUTES.filter(({ path }) => hits[path])
  }, [query])

  useEffect(() => {
    setSelected(0)
  }, [query])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      inputRef.current?.select()
    } else {
      setQuery("")
    }
  }, [open])

  // keep the highlighted row in view when arrowing past the fold
  useEffect(() => {
    const el = listRef.current?.children[selected] as HTMLElement | undefined
    el?.scrollIntoView({ block: "nearest" })
  }, [selected])

  if (!open) {
    return null
  }

  function go(route: Route) {
    window.location.href = route.path
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key == "Escape") {
      e.preventDefault()
      onClose()
    } else if (e.key == "ArrowDown") {
      e.preventDefault()
      setSelected((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key == "ArrowUp") {
      e.preventDefault()
      setSelected((i) =>
        results.length ? (i - 1 + results.length) % results.length : 0,
      )
    } else if (e.key == "Enter") {
      e.preventDefault()
      if (results[selected]) {
        go(results[selected])
      }
    }
  }

  return (
    <div className={styles.scrim} onClick={onClose} role="presentation">
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Search the docs"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className={styles.inputRow}>
          <Search size={16} className={styles.icon} />
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the docs"
            aria-label="Search the docs"
          />
          <kbd className={styles.kbd}>Esc</kbd>
        </div>

        {query.trim().length > 0 ? (
          results.length > 0 ? (
            <ul className={styles.list} ref={listRef}>
              {results.map((route, i) => (
                <li key={route.path}>
                  <a
                    href={route.path}
                    className={i == selected ? styles.hitActive : styles.hit}
                    onMouseEnter={() => setSelected(i)}
                    onClick={(e) => {
                      e.preventDefault()
                      go(route)
                    }}
                  >
                    <span className={styles.hitTitle}>{route.title}</span>
                    <span className={styles.hitSection}>
                      {SECTION_BY_PATH[route.path] || "Docs"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>No results</div>
          )
        ) : (
          <div className={styles.empty}>Type to search</div>
        )}

        <div className={styles.footer}>
          <span>
            <kbd className={styles.kbd}>↑</kbd>
            <kbd className={styles.kbd}>↓</kbd> to navigate
          </span>
          <span>
            <kbd className={styles.kbd}>↵</kbd> to open
          </span>
        </div>
      </div>
    </div>
  )
}

export default SearchOverlay
