import React, { useRef, useLayoutEffect, useEffect, useState } from "react"
import { useAppContext } from "../contexts/AppContext"
import styles from "./Layout.module.css"
import SideNav from "./SideNav"
import Header from "./Header"
import Footer from "./Footer"
import SearchOverlay from "./SearchOverlay"

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const { state, toggleSideNav } = useAppContext()
  const ref = useRef<HTMLDivElement>(null)
  const [searchOpen, setSearchOpen] = useState(false)

  // Global search shortcuts: "/" like Stripe, plus cmd/ctrl+K.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const el = e.target as HTMLElement | null
      const typing =
        !!el &&
        (el.tagName == "INPUT" || el.tagName == "TEXTAREA" || el.isContentEditable)

      if ((e.key == "k" || e.key == "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      } else if (e.key == "/" && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = parseInt(sessionStorage.getItem("scroll") || "0") || 0
    }
  }, [])

  function onClick(path: string) {
    sessionStorage.setItem("scroll", (ref.current?.scrollTop || 0).toString())
    window.location.href = path
  }

  return (
    <div className={styles.component}>
      {/* ambient terminal texture — film grain + scanlines (brand) */}
      <div className="strk-grain" aria-hidden="true" />
      <div className="strk-scanlines" aria-hidden="true" />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <div
        ref={ref}
        className={styles.sideNav}
        style={
          state.sideNav
            ? {
                width: "var(--side-nav-width)",
                padding: "20px 12px 60px 12px",
                borderRight: "1px solid var(--border-color)",
              }
            : {
                width: 0,
              }
        }
      >
        {state.sideNav ? <SideNav onClick={onClick} /> : null}
      </div>
      {/* tap-outside-to-close for the mobile drawer; CSS hides it on desktop */}
      {state.sideNav ? (
        <div className={styles.backdrop} onClick={toggleSideNav} aria-hidden="true" />
      ) : null}
      <div className={styles.main} data-scroll-root>
        <Header onOpenSearch={() => setSearchOpen(true)} />
        <div className={styles.children}>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
