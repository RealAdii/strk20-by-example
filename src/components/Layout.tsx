import React, { useRef, useLayoutEffect } from "react"
import { useAppContext } from "../contexts/AppContext"
import styles from "./Layout.module.css"
import SideNav from "./SideNav"
import Header from "./Header"
import Footer from "./Footer"

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const { state, toggleSideNav } = useAppContext()
  const ref = useRef<HTMLDivElement>(null)

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
      <div className={styles.main}>
        <Header />
        <div className={styles.children}>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
