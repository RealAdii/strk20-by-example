import React from "react"
import { useLocation } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import Hamburger from "./svg/Hamburger"
import styles from "./Header.module.css"
import DarkMode from "./svg/DarkMode"
import LightMode from "./svg/LightMode"
import Strk20 from "./svg/Strk20"
import Search from "./svg/Search"
import AskAi from "./AskAi"
import { ROUTES_BY_CATEGORY, categoryRoutes, getCategoryIndexByPath } from "../nav"

interface Props {
  onOpenSearch: () => void
}

const Header: React.FC<Props> = ({ onOpenSearch }) => {
  const { state, setTheme, toggleSideNav } = useAppContext()
  const location = useLocation()
  const activeCategory = getCategoryIndexByPath(location.pathname)

  function onClickTheme() {
    setTheme(state.theme == "light" ? "dark" : "light")
  }

  return (
    <header className={styles.component}>
      <div className={styles.bar}>
        <div className={styles.left}>
          <button
            /* On desktop this is only the *expand* control — while the rail is
               open, collapsing happens from inside the rail. */
            className={`${state.sideNav ? styles.navToggleWhenOpen : styles.navToggle} press-lift`}
            onClick={toggleSideNav}
            title={state.sideNav ? "Hide navigation" : "Show navigation"}
            aria-label={state.sideNav ? "Hide navigation" : "Show navigation"}
            aria-expanded={state.sideNav}
          >
            <Hamburger size={20} className={styles.hamburger} />
          </button>
          <a href="/" className={styles.a} aria-label="STRK20 by Example home">
            <Strk20 className={styles.logo} size={18} />
          </a>
          <span className={styles.wordmark}>
            <a href="/" className={styles.a}>
              by Example
            </a>
          </span>
        </div>

        <div className={styles.center}>
          <button
            className={`${styles.search} press`}
            onClick={onOpenSearch}
            aria-label="Search the docs"
          >
            <Search size={15} className={styles.searchIcon} />
            <span className={styles.searchLabel}>Search</span>
            <kbd className={styles.searchKbd}>/</kbd>
          </button>
          <AskAi />
        </div>

        <div className={styles.right}>
          <button
            className={`${styles.mode} press-lift`}
            onClick={onClickTheme}
            title={
              state.theme == "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-label={
              state.theme == "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {state.theme == "dark" ? <LightMode size={20} /> : <DarkMode size={18} />}
          </button>
        </div>
      </div>

      {/* Product tabs — pick the section; the rail below scopes to it. */}
      <nav className={styles.tabs} aria-label="Sections">
        <div className={styles.tabList}>
          {ROUTES_BY_CATEGORY.map((category, i) => {
            const first = categoryRoutes(category)[0]
            if (!first) {
              return null
            }

            return (
              <a
                key={category.tab}
                href={first.path}
                className={i == activeCategory ? styles.tabActive : styles.tab}
                aria-current={i == activeCategory ? "page" : undefined}
              >
                {category.tab}
              </a>
            )
          })}
        </div>

        <div className={styles.tabsRight}>
          <a
            className={styles.tabLink}
            href="https://docs.starknet.io/build/starknet-privacy/overview"
            target="_blank"
            rel="noopener noreferrer"
          >
            Starknet docs
          </a>
          <a
            className={styles.tabLink}
            href="https://github.com/starkware-libs/starknet-privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header
