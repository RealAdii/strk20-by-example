import React, { useEffect, useState } from "react"
import styles from "./Toc.module.css"

interface Item {
  id: string
  text: string
  depth: number
}

// Reads the headings the markdown pipeline emitted rather than threading a
// headings array through the build. Every navigation here is a full page load,
// so collecting once on mount is enough.
const Toc: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [active, setActive] = useState("")

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-toc-root] h2[id], [data-toc-root] h3[id]",
      ),
    )

    setItems(
      nodes.map((n) => ({
        id: n.id,
        // drop the trailing "#" anchor link from the label
        text: (n.textContent || "").replace(/#$/, "").trim(),
        depth: Number(n.tagName[1]),
      })),
    )

    if (nodes.length == 0) {
      return
    }

    // The page scrolls inside Layout's main column, not the window.
    const root = document.querySelector("[data-scroll-root]")
    const scroller: EventTarget = root || window

    // Track by position rather than by intersection: "last heading above the
    // read line". An intersection band leaves the active item stale whenever
    // no heading sits inside it — on a jump, or in a section taller than the
    // band — which is most of them.
    let raf = 0

    function compute() {
      raf = 0
      const line = (root ? root.getBoundingClientRect().top : 0) + 88
      let current = nodes[0]
      for (const n of nodes) {
        if (n.getBoundingClientRect().top > line) {
          break
        }
        current = n
      }

      // A short final section never reaches the read line, so its entry would
      // never light up. At the bottom of the scroller, it's the active one.
      if (root && root.scrollTop + root.clientHeight >= root.scrollHeight - 4) {
        current = nodes[nodes.length - 1]
      }

      setActive(current.id)
    }

    function onScroll() {
      if (!raf) {
        raf = requestAnimationFrame(compute)
      }
    }

    compute()
    scroller.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      scroller.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) {
        cancelAnimationFrame(raf)
      }
    }
  }, [])

  if (items.length < 2) {
    return null
  }

  function onClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ block: "start" })
      history.replaceState(null, "", `#${id}`)
      setActive(id)
    }
  }

  return (
    <nav className={styles.component} aria-label="On this page">
      <div className={styles.heading}>
        <span className={styles.tick}>◢</span> On this page
      </div>
      <ul className={styles.list}>
        {items.map(({ id, text, depth }) => (
          <li key={id} className={depth == 3 ? styles.nested : undefined}>
            <a
              href={`#${id}`}
              onClick={(e) => onClick(e, id)}
              className={id == active ? styles.linkActive : styles.link}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Toc
