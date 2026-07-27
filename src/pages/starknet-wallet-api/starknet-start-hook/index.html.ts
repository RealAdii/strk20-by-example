// metadata
export const version = "0.14.3"
export const title = "starknet-start"
export const description =
  "Use the starknet-start useStrk20 React hooks as a convenience wrapper over the Starknet Wallet API."
export const githubLink = "https://github.com/starknet-innovation/starknet-start"
export const githubLabel = "starknet-start repo"

export const keywords = [
  "starknet-start",
  "useStrk20",
  "react hooks",
  "wallet api",
  "WalletAccountV6",
  "private dapp",
  "hooks",
]

export const codes = []

const html = `<p>The <strong><code>useStrk20</code> hooks</strong> from
<a href="https://starknet-innovation.github.io/starknet-start/docs/hooks/use-strk20/#hooks">Starknet Start</a>
are a convenience wrapper over the <a href="/starknet-wallet-api/overview">Starknet Wallet API</a>.
They are the recommended starting point for <strong>React dapps</strong>.</p>
<h2 id="when-to-use-this">When to use this<a class="anchor" href="#when-to-use-this" aria-label="Link to this section">#</a></h2>
<p>Use the hooks when you are building a <strong>React dapp</strong> on top of an existing
privacy-enabled wallet and want to request STRK20 actions without wiring each
wallet call by hand. If you are working outside React, or need finer control over
connection and proof handling, use
<a href="/starknet-wallet-api/starknet-js">starknet.js <code>WalletAccountV6</code></a> directly.</p>
<h2 id="how-it-works">How it works<a class="anchor" href="#how-it-works" aria-label="Link to this section">#</a></h2>
<p>The hooks call into a <code>WalletAccountV6</code> (or equivalent) under the hood. Your React
components ask for a private action; the connected wallet manages the private
state, ZK proof, and signature wallet-side.</p>
<h2 id="what-to-keep-in-mind">What to keep in mind<a class="anchor" href="#what-to-keep-in-mind" aria-label="Link to this section">#</a></h2>
<ul>
<li><strong>Wallet support is required.</strong> The connected wallet must support the STRK20
wallet API methods, since the ZK proofs and signatures are managed wallet-side.</li>
<li><strong>React only.</strong> The hooks are a React convenience layer; non-React apps should
use the <a href="/starknet-wallet-api/starknet-js">starknet.js</a> route.</li>
<li><strong>Follow the upstream docs.</strong> For hook names, parameters, and return values, see
the
<a href="https://starknet-innovation.github.io/starknet-start/docs/hooks/use-strk20/#hooks">Starknet Start <code>useStrk20</code> reference</a>.</li>
</ul>
<h2 id="read-next">Read next<a class="anchor" href="#read-next" aria-label="Link to this section">#</a></h2>
<ul>
<li><a href="/starknet-wallet-api/overview">Starknet Wallet API overview</a></li>
<li><a href="/starknet-wallet-api/starknet-js">starknet.js</a></li>
<li><a href="/helpers/privacy-invoke">Anonymizer Contract Anatomy</a></li>
</ul>
`

export default html
