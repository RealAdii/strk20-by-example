import React from "react"
import { useLocation, matchPath } from "react-router-dom"
import styles from "./SideNav.module.css"
import { useAppContext } from "../contexts/AppContext"
import { Route, ROUTES_BY_CATEGORY } from "../nav"
import { withBase } from "../lib/url"

interface Props {
  onClick: (path: string) => void
}

// The rail carries the whole site: every section, in reading order, always
// open. Nothing here collapses — the product tabs above mark where you are
// rather than filtering what's listed.
const SideNav: React.FC<Props> = ({ onClick }) => {
  const location = useLocation()
  const { toggleSideNav } = useAppContext()

  function isActive(path: string) {
    return !!matchPath(path, location.pathname)
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
              <a
                className={styles.link}
                href={withBase(path)}
                onClick={(e) => _onClick(e, path)}
              >
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

            {groups.map((group) => (
              <div className={styles.group} key={group.title}>
                <div className={styles.groupTitle}>{group.title}</div>
                {renderRoutes(group.routes, true)}
              </div>
            ))}
          </div>
        )
      })}
    </>
  )
}

export default SideNav
