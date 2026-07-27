import React from "react"

interface Props {
  size?: number
  className?: string
}

const Sparkle: React.FC<Props> = ({ size = 14, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5z" />
    <path d="M18.8 15.2l.85 2.45 2.45.85-2.45.85-.85 2.45-.85-2.45-2.45-.85 2.45-.85.85-2.45z" />
  </svg>
)

export default Sparkle
