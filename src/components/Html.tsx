import React from "react"
import useCopy from "../hooks/useCopy"
import { withBaseInHtml } from "../lib/url"

interface Props {
  className?: string
  html: string
}

const Html: React.FC<Props> = ({ className = "", html }) => {
  useCopy([])

  return (
    <div
      className={`code ${className}`}
      dangerouslySetInnerHTML={{ __html: withBaseInHtml(html) }}
    />
  )
}

export default Html
