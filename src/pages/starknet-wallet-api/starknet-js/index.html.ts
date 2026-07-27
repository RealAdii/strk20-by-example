// metadata
export const version = "0.14.3"
export const title = "starknet.js"
export const description =
  "Call the Starknet Wallet API directly with starknet.js WalletAccountV6 for non-React apps or finer control."
export const githubLink = "https://github.com/starknet-io/starknet.js"
export const githubLabel = "starknet js repo"

export const keywords = [
  "starknet.js",
  "WalletAccountV6",
  "get-starknet",
  "wallet api",
  "private dapp",
  "proof handling",
  "connection",
]

export const codes = []

const html = `<p>The <strong><code>starknet.js</code> <code>WalletAccountV6</code> API</strong> is the direct way to reach the
<a href="/starknet-wallet-api/overview">Starknet Wallet API</a>. Use it when you are working
<strong>outside React</strong>, or when you need <strong>finer control over connection and proof
handling</strong> than the React hooks provide.</p>
<h2 id="when-to-use-this">When to use this<a class="anchor" href="#when-to-use-this" aria-label="Link to this section">#</a></h2>
<p>Reach for <code>WalletAccountV6</code> directly when a React convenience layer does not fit -
for example non-React frontends, scripts, or flows where you manage wallet
connection and proof handling yourself. If you are building a React dapp, the
<a href="/starknet-wallet-api/starknet-start-hook">starknet-start <code>useStrk20</code> hooks</a> wrap
this same API for you.</p>
<h2 id="how-it-works">How it works<a class="anchor" href="#how-it-works" aria-label="Link to this section">#</a></h2>
<p>Your app connects to the user&#39;s privacy-enabled wallet through <code>starknet.js</code>, then
issues STRK20 actions through the Wallet API. The wallet manages the private
state, ZK proof, and signature wallet-side.</p>
<h2 id="what-to-keep-in-mind">What to keep in mind<a class="anchor" href="#what-to-keep-in-mind" aria-label="Link to this section">#</a></h2>
<ul>
<li><strong>Wallet support is required.</strong> The connected wallet must support the STRK20
wallet API methods, since the ZK proofs and signatures are managed wallet-side.</li>
<li><strong>You own the wiring.</strong> Without the hooks, you handle connection and proof
handling explicitly.</li>
<li><strong>Follow the upstream docs.</strong> For connecting with get-starknet v6 and the
<code>WalletAccountV6</code> API, see the
<a href="https://starknet-js.com/docs/next/guides/account/walletAccount/#with-get-starknet-v6">starknet.js WalletAccount guide</a>.</li>
</ul>
<h2 id="read-next">Read next<a class="anchor" href="#read-next" aria-label="Link to this section">#</a></h2>
<ul>
<li><a href="/starknet-wallet-api/overview">Starknet Wallet API overview</a></li>
<li><a href="/starknet-wallet-api/starknet-start-hook">starknet-start</a></li>
<li><a href="/sdk/getting-started">Build Privacy Wallets</a></li>
</ul>
`

export default html
