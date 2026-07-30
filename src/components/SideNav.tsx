import React, { useState } from "react"
import { useLocation, matchPath } from "react-router-dom"
import styles from "./SideNav.module.css"
import { useAppContext } from "../contexts/AppContext"
import { Route, ROUTES_BY_CATEGORY } from "../nav"

interface Props {
  onClick: (path: string) => void
}

const STORAGE_KEY = "sideNavExpanded"

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

// The rail carries the whole site: every section, in reading order. The
// product tabs above mark where you are rather than filtering what's listed.
const SideNav: React.FC<Props> = ({ onClick }) => {
  const location = useLocation()
  const { toggleSideNav } = useAppContext()

  function isActive(path: string) {
    return !!matchPath(path, location.pathname)
  }

  const [overrides, setOverrides] = useState<{ [key: string]: boolean }>(readOverrides)

  // Everything starts open: the rail's job here is to show the whole site at
  // a glance. Collapsing is available, just not the default.
  function expanded(key: string): boolean {
    return overrides[key] ?? true
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
      <div className={styles.railHeader}>
        <button
          className={styles.collapse}
          onClick={toggleSideNav}
          title="Collapse sidebar"
          aria-label="Collapse sidebar"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 7l-5 5 5 5" />
            <path d="M18 5v14" />
          </svg>
        </button>
      </div>

      {ROUTES_BY_CATEGORY.map((category, i) => {
        const { routes = [], groups = [], tab } = category

        return (
          <div className={styles.section} key={tab || i}>
            {/* the short label: `title` runs to two lines for some sections */}
            <div className={styles.category}>{tab}</div>

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
                      className={gOpen ? styles.groupChevronOpen : styles.groupChevron}
                    >
                      ›
                    </span>
                    <span className={styles.groupLabel}>{group.title}</span>
                  </button>
                  {/* grid 0fr->1fr collapses to content height without anyone
                      measuring it; the list stays mounted so it animates */}
                  <div className={gOpen ? styles.collapsibleOpen : styles.collapsible}>
                    <div className={styles.collapsibleInner}>
                      {renderRoutes(group.routes, true)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </>
  )
}

export default SideNav
