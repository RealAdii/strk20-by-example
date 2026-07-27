import React, { useMemo, useState } from "react"
import { useLocation, matchPath } from "react-router-dom"
import styles from "./SideNav.module.css"
import { Route, RouteCategory, ROUTES_BY_CATEGORY } from "../nav"

interface Props {
  onClick: (path: string) => void
}

const STORAGE_KEY = "sideNavExpanded"

function categoryKey(category: RouteCategory, i: number): string {
  return `cat:${category.title || i}`
}

function groupKey(title: string): string {
  return `grp:${title}`
}

function readOverrides(): { [key: string]: boolean } {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
  } catch (error) {
    return {}
  }
}

const SideNav: React.FC<Props> = ({ onClick }) => {
  const location = useLocation()

  function isActive(path: string) {
    return !!matchPath(path, location.pathname)
  }

  // Default state scopes the rail to where you are: only the branch holding
  // the current page is open. Manual toggles layer on top and persist.
  const defaults = useMemo(() => {
    const map: { [key: string]: boolean } = {}

    for (let i = 0; i < ROUTES_BY_CATEGORY.length; i++) {
      const category = ROUTES_BY_CATEGORY[i]
      const { routes = [], groups = [] } = category

      const groupHasActive = groups.map((g) => g.routes.some((r) => isActive(r.path)))
      const hasActive =
        routes.some((r) => isActive(r.path)) || groupHasActive.some(Boolean)

      map[categoryKey(category, i)] = hasActive
      for (let j = 0; j < groups.length; j++) {
        map[groupKey(groups[j].title)] = groupHasActive[j]
      }
    }

    // Nothing matched (the homepage, or an unknown path) — open the first
    // section rather than presenting a fully collapsed rail.
    if (!Object.values(map).some(Boolean) && ROUTES_BY_CATEGORY.length > 0) {
      map[categoryKey(ROUTES_BY_CATEGORY[0], 0)] = true
    }

    return map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const [overrides, setOverrides] = useState<{ [key: string]: boolean }>(readOverrides)

  function expanded(key: string): boolean {
    return overrides[key] ?? defaults[key] ?? false
  }

  function toggle(key: string) {
    const next = { ...overrides, [key]: !expanded(key) }
    setOverrides(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch (error) {
      // non-fatal: the rail just won't remember across reloads
    }
  }

  function _onClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) {
    e.preventDefault()
    onClick(path)
  }

  function renderRoutes(routes: Route[], nested = false) {
    return (
      <ul className={nested ? styles.nestedList : styles.list}>
        {routes.map(({ path, title }) => {
          const active = isActive(path)

          return (
            <li className={active ? styles.listItemActive : styles.listItem} key={path}>
              <a className={styles.link} href={path} onClick={(e) => _onClick(e, path)}>
                {title}
              </a>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      {ROUTES_BY_CATEGORY.map((category, i) => {
        const { routes = [], groups = [], title } = category
        const key = categoryKey(category, i)
        const open = expanded(key)

        return (
          <div className={styles.section} key={key}>
            <button
              className={styles.category}
              onClick={() => toggle(key)}
              aria-expanded={open}
            >
              <span className={styles.tick}>◢</span>
              <span className={styles.categoryLabel}>
                {(title || "Concepts").split("\n").map((line, j) => (
                  <React.Fragment key={j}>
                    {j > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </span>
              <span className={open ? styles.chevronOpen : styles.chevron}>›</span>
            </button>

            {open ? (
              <div>
                {routes.length > 0 && renderRoutes(routes)}
                {groups.map((group) => {
                  const gKey = groupKey(group.title)
                  const gOpen = expanded(gKey)

                  return (
                    <div className={styles.group} key={gKey}>
                      <button
                        className={styles.groupTitle}
                        onClick={() => toggle(gKey)}
                        aria-expanded={gOpen}
                      >
                        <span
                          className={
                            gOpen ? styles.groupChevronOpen : styles.groupChevron
                          }
                        >
                          ›
                        </span>
                        <span className={styles.groupLabel}>{group.title}</span>
                      </button>
                      {gOpen && renderRoutes(group.routes, true)}
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        )
      })}
    </>
  )
}

export default SideNav
