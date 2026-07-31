import React from "react"
import { useAppContext } from "../../contexts/AppContext"
import { withBase } from "../../lib/url"

interface Props {
  size: number
  className?: string
}

// STRK[20] wordmark from the brand kit — vector, so it stays crisp at any size.
// STRK is set in the surface's own ink; the bracketed [20] stays orange.
const Strk20: React.FC<Props> = ({ size, className = "" }) => {
  const { state } = useAppContext()

  return (
    <img
      src={withBase(
        state.theme === "dark" ? "/strk20-logo.svg" : "/strk20-logo-onlight.svg",
      )}
      alt="STRK20"
      height={size}
      style={{ height: size, width: "auto", display: "block" }}
      className={className}
    />
  )
}

export default Strk20
