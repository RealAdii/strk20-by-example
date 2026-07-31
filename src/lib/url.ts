// The site can be served from the root of its own domain, or mounted under a
// prefix on another (strk20.starknet.io/docs). Vite sets BASE_URL from the
// `base` build option, so one helper covers every real URL the app emits.
//
// React Router strips the basename from location.pathname, and every route in
// nav.ts is written root-relative, so anything that becomes an actual href or
// a window.location assignment has to be put back through this.

const BASE = import.meta.env.BASE_URL || "/"

// "/docs/" -> "/docs"; "/" -> ""
const PREFIX = BASE.replace(/\/+$/, "")

export function withBase(path: string): string {
  if (!PREFIX) {
    return path
  }
  // already prefixed (e.g. a raw pathname that includes the base)
  if (path == PREFIX || path.startsWith(`${PREFIX}/`)) {
    return path
  }
  return `${PREFIX}${path.startsWith("/") ? path : `/${path}`}`
}

// Rewrites root-relative hrefs inside generated markdown HTML. The generated
// files are committed, so they must stay environment-neutral: the prefix is
// applied here at runtime rather than baked in at build time.
export function withBaseInHtml(html: string): string {
  if (!PREFIX) {
    return html
  }
  // href="/x" but not href="//host" (protocol-relative) and not already prefixed
  return html.replace(/href="\/(?!\/)([^"]*)"/g, (match, rest: string) =>
    rest == PREFIX.slice(1) || rest.startsWith(`${PREFIX.slice(1)}/`)
      ? match
      : `href="${PREFIX}/${rest}"`,
  )
}
