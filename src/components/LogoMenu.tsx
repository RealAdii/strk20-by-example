import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Strk20 from "./svg/Strk20"
import styles from "./LogoMenu.module.css"

// Mirrors the brand menu on strk20.starknet.io: click the mark to download it
// (SVG/PNG) or jump back to the marketing homepage. The assets live on that
// site, not in this app, so these hrefs are plain root-absolute paths rather
// than withBase() — they're only correct when this app is reverse-proxied
// under strk20.starknet.io/docs, same as the rest of the marketing site.
//
// Portaled to <body> and positioned from the trigger's real rect: the header
// row it lives in clips overflow (for text truncation), which would clip an
// absolutely-positioned popover anchored inside it.
const LogoMenu: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const wrapRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  function openMenu() {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (rect) {
      setPos({ top: rect.bottom + 12, left: rect.left })
    }
    setOpen(true)
  }

  useEffect(() => {
    if (!open) {
      return
    }
    function onDoc(e: MouseEvent) {
      const target = e.target as Node
      if (
        wrapRef.current &&
        !wrapRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key == "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onDoc)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={wrapRef} className={styles.component}>
      <button
        type="button"
        className={styles.trigger}
        aria-label="STRK20 — logo & brand menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openMenu())}
      >
        <Strk20 size={18} />
      </button>

      {open
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              className={styles.menu}
              style={{ top: pos.top, left: pos.left }}
            >
              <div className={styles.heading}>Download logo</div>
              <a
                role="menuitem"
                href="/brand/strk20-logo.svg"
                download="strk20-logo.svg"
                className={styles.item}
                onClick={() => setOpen(false)}
              >
                <span>SVG</span>
                <span className={styles.ext}>vector</span>
              </a>
              <a
                role="menuitem"
                href="/brand/strk20-logo.png"
                download="strk20-logo.png"
                className={styles.item}
                onClick={() => setOpen(false)}
              >
                <span>PNG</span>
                <span className={styles.ext}>2400px · transparent</span>
              </a>
              <div className={styles.divider} />
              <a
                role="menuitem"
                href="/brand"
                className={styles.item}
                onClick={() => setOpen(false)}
              >
                <span>Brand &amp; UI kit</span>
                <span className={styles.ext}>↗</span>
              </a>
              <a
                role="menuitem"
                href="/"
                className={styles.item}
                onClick={() => setOpen(false)}
              >
                <span>Go to homepage</span>
                <span className={styles.ext}>↗</span>
              </a>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}

export default LogoMenu
