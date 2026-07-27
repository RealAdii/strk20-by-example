import React, { useMemo, useState } from "react"
import { useLocation, matchPath } from "react-router-dom"
import styles from "./SideNav.module.css"
import { Route, ROUTES_BY_CATEGORY, getCategoryIndexByPath } from "../nav"

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

// The product tabs in the header choose the section, so the rail only ever
// shows one category's tree — the Stripe model. No category accordions here.
const SideNav: React.FC<Props> = ({ onClick }) => {
  const location = useLocation()

  const index = getCategoryIndexByPath(location.pathname)
  // The home page sits above the tabs; show the first section there.
  const category = ROUTES_BY_CATEGORY[index == -1 ? 0 : index]

  function isActive(path: string) {
    return !!matchPath(path, location.pathname)
  }

  // Groups still collapse, and the one holding the current page starts open.
  const defaults = useMemo(() => {
    const map: { [key: string]: boolean } = {}
    for (const group of category.groups || []) {
      map[groupKey(group.title)] = group.routes.some((r) => isActive(r.path))
    }
    return map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, category])

  const [overrides, setOverrides] = useState<{ [key: string]: boolean }>(readOverrides)

  function expanded(key: string): boolean {
    return overrides[key] ?? defaults[key] ?? true
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

  const { routes = [], groups = [], title, tab } = category

  return (
    <>
      <div className={styles.railTitle}>
        <span className={styles.tick}>◢</span>
        <span>{(title || tab).split("\n").join(" ")}</span>
      </div>

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
              <span className={gOpen ? styles.groupChevronOpen : styles.groupChevron}>
                ›
              </span>
              <span className={styles.groupLabel}>{group.title}</span>
            </button>
            {gOpen && renderRoutes(group.routes, true)}
          </div>
        )
      })}
    </>
  )
}

export default SideNav
