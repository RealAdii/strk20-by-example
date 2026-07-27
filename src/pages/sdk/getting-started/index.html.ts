// metadata
export const version = "0.14.3"
export const title = "Getting Started"
export const description =
  "Build privacy wallets on Starknet with the low-level STRK20 SDK and createPrivateTransfers"
export const githubLink =
  "https://github.com/starkware-libs/starknet-privacy/blob/main/sdk/README.md"
export const githubLabel = ""

export const keywords = [
  "build privacy wallets",
  "privacy wallet sdk",
  "wallet builder",
  "setup",
  "install",
  "createPrivateTransfers",
  "provider",
  "quickstart",
]

export const codes = []

const html = `<p>These pages are for teams building <strong>privacy wallets on Starknet</strong> or advanced
integrations that manage their own account, keys, note discovery, and proving.
If you are building a private dapp on top of an existing wallet, use the
<a href="/starknet-wallet-api/overview">Starknet Wallet API</a> instead - it keeps viewing
keys inside the wallet. Everything here goes through one factory:
<code>createPrivateTransfers</code>.</p>
<h2 id="install">Install<a class="anchor" href="#install" aria-label="Link to this section">#</a></h2>
<pre><code class="language-shell">npm install @starkware-libs/starknet-privacy-sdk
</code></pre><h2 id="wire-it-up">Wire it up<a class="anchor" href="#wire-it-up" aria-label="Link to this section">#</a></h2>
<p>The factory needs a Starknet account plus three providers: a <strong>viewing key
provider</strong> (your privacy key), a <strong>proving provider</strong> (generates validity proofs)
and a <strong>discovery provider</strong> (finds your notes and channels).</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Account</span>, <span class="hljs-title class_">RpcProvider</span>, constants } <span class="hljs-keyword">from</span> <span class="hljs-string">"starknet"</span>
<span class="hljs-keyword">import</span> {
  createPrivateTransfers,
  <span class="hljs-title class_">ProvingServiceProofProvider</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">"@starkware-libs/starknet-privacy-sdk"</span>
<span class="hljs-comment">// Deep import - the root export&#x27;s type does not currently match the</span>
<span class="hljs-comment">// interface the factory expects.</span>
<span class="hljs-comment">// @ts-expect-error</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexerDiscoveryProvider</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"@starkware-libs/starknet-privacy-sdk/dist/internal/indexer-discovery.js"</span>

<span class="hljs-keyword">const</span> provider = <span class="hljs-keyword">new</span> <span class="hljs-title class_">RpcProvider</span>({ <span class="hljs-attr">nodeUrl</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">RPC_URL</span>! })

<span class="hljs-comment">// cairoVersion "1" is required for accounts sending v3 transactions</span>
<span class="hljs-keyword">const</span> account = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Account</span>({
  provider,
  <span class="hljs-attr">address</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">ACCOUNT_ADDRESS</span>!,
  <span class="hljs-attr">signer</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">ACCOUNT_PRIVATE_KEY</span>!,
  <span class="hljs-attr">cairoVersion</span>: <span class="hljs-string">"1"</span>,
})

<span class="hljs-keyword">const</span> transfers = <span class="hljs-title function_">createPrivateTransfers</span>({
  account,
  <span class="hljs-comment">// The viewing key MUST be a bigint. A hex string silently misbehaves</span>
  <span class="hljs-comment">// downstream (wrong channel-key derivation).</span>
  <span class="hljs-attr">viewingKeyProvider</span>: {
    <span class="hljs-attr">getViewingKey</span>: <span class="hljs-title function_">async</span> () =&gt; <span class="hljs-title class_">BigInt</span>(process.<span class="hljs-property">env</span>.<span class="hljs-property">VIEWING_KEY</span>!),
  },
  <span class="hljs-attr">provingProvider</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">ProvingServiceProofProvider</span>(
    process.<span class="hljs-property">env</span>.<span class="hljs-property">PROVING_SERVICE_URL</span>!,
    constants.<span class="hljs-property">StarknetChainId</span>.<span class="hljs-property">SN_SEPOLIA</span>,
  ),
  <span class="hljs-attr">discoveryProvider</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">IndexerDiscoveryProvider</span>(
    process.<span class="hljs-property">env</span>.<span class="hljs-property">INDEXER_URL</span>!,
    process.<span class="hljs-property">env</span>.<span class="hljs-property">POOL_ADDRESS</span>!,
  ),
  <span class="hljs-attr">poolContractAddress</span>: process.<span class="hljs-property">env</span>.<span class="hljs-property">POOL_ADDRESS</span>!,
})
</code></pre><h2 id="your-first-transaction">Your first transaction<a class="anchor" href="#your-first-transaction" aria-label="Link to this section">#</a></h2>
<p>Every operation follows the same shape: <code>build()</code> a batch of operations, then
<code>execute()</code> it and submit the resulting call.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Prove against a slightly older block: notes mature 10 blocks after</span>
<span class="hljs-comment">// creation, and proving at the chain head risks reorg invalidation.</span>
<span class="hljs-keyword">const</span> provingBlockId = (<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">getBlockNumber</span>()) - <span class="hljs-number">10</span>

<span class="hljs-keyword">const</span> { callAndProof } = <span class="hljs-keyword">await</span> transfers.<span class="hljs-title function_">build</span>().<span class="hljs-title function_">register</span>().<span class="hljs-title function_">execute</span>({ provingBlockId })

<span class="hljs-comment">// Omit proof keys entirely when there are no proof facts - passing</span>
<span class="hljs-comment">// empty arrays serializes an invalid v3 transaction.</span>
<span class="hljs-keyword">const</span> proofDetails = callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>?.<span class="hljs-property">length</span>
  ? { <span class="hljs-attr">proofFacts</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>, <span class="hljs-attr">proof</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">data</span> }
  : {}

<span class="hljs-comment">// tip is mandatory for v3 transactions in starknet.js</span>
<span class="hljs-keyword">const</span> tx = <span class="hljs-keyword">await</span> account.<span class="hljs-title function_">execute</span>(callAndProof.<span class="hljs-property">call</span>, { <span class="hljs-attr">tip</span>: <span class="hljs-number">0n</span>, ...proofDetails })

<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">waitForTransaction</span>(tx.<span class="hljs-property">transaction_hash</span>)
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`registered in tx <span class="hljs-subst">\${tx.transaction_hash}</span>\`</span>)
</code></pre><p>This submission tail - back off <code>provingBlockId</code>, conditionally spread
<code>proofDetails</code>, pass <code>tip: 0n</code>, wait - is identical for every operation in the
following pages. We will not repeat the explanation, just the code.</p>
<h2 id="what-each-provider-does">What each provider does<a class="anchor" href="#what-each-provider-does" aria-label="Link to this section">#</a></h2>
<table>
<thead>
<tr>
<th>Provider</th>
<th>Role</th>
</tr>
</thead>
<tbody><tr>
<td><code>viewingKeyProvider</code></td>
<td>Supplies the private viewing key <code>k</code> used to decrypt notes and derive nullifiers</td>
</tr>
<tr>
<td><code>provingProvider</code></td>
<td>Sends your signed invocation to a proving service, which executes it in a virtual Starknet environment and returns a STARK proof</td>
</tr>
<tr>
<td><code>discoveryProvider</code></td>
<td>Scans your channels for incoming notes. <code>IndexerDiscoveryProvider</code> (HTTP service, production) or <code>ContractDiscoveryProvider</code> (direct RPC, development)</td>
</tr>
</tbody></table>
<p>Next: register your viewing key so you can receive private transfers.</p>
`

export default html
