// metadata
export const version = "0.14.3"
export const title = "Register"
export const description =
  "Register your viewing key in the privacy pool with the builder or autoRegister"
export const githubLink =
  "https://github.com/starkware-libs/starknet-privacy/blob/main/sdk/README.md"
export const githubLabel = ""

export const keywords = [
  "register",
  "viewing key",
  "builder",
  "autoRegister",
  "onboarding",
]

export const codes = []

const html = `<p>Before an account can receive private transfers it must <strong>register</strong>: publish
its public viewing key on-chain and store the auditor-encrypted private key.
This happens once per account per pool deployment.</p>
<p>Snippets assume <code>transfers</code>, <code>account</code> and <code>provider</code> from
<a href="/sdk/getting-started">Getting Started</a>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> provingBlockId = (<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">getBlockNumber</span>()) - <span class="hljs-number">10</span>

<span class="hljs-keyword">const</span> { callAndProof } = <span class="hljs-keyword">await</span> transfers.<span class="hljs-title function_">build</span>().<span class="hljs-title function_">register</span>().<span class="hljs-title function_">execute</span>({ provingBlockId })

<span class="hljs-comment">// Submission tail (explained in Getting Started)</span>
<span class="hljs-keyword">const</span> proofDetails = callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>?.<span class="hljs-property">length</span>
  ? { <span class="hljs-attr">proofFacts</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>, <span class="hljs-attr">proof</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">data</span> }
  : {}
<span class="hljs-keyword">const</span> tx = <span class="hljs-keyword">await</span> account.<span class="hljs-title function_">execute</span>(callAndProof.<span class="hljs-property">call</span>, { <span class="hljs-attr">tip</span>: <span class="hljs-number">0n</span>, ...proofDetails })
<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">waitForTransaction</span>(tx.<span class="hljs-property">transaction_hash</span>)
</code></pre><h2 id="things-to-notice">Things to notice<a class="anchor" href="#things-to-notice" aria-label="Link to this section">#</a></h2>
<ul>
<li>You never pass the viewing key to <code>register()</code>. The builder pulls it from
the <code>viewingKeyProvider</code> you wired into <code>createPrivateTransfers</code>.</li>
<li>The viewing key must be a <strong><code>BigInt</code></strong> in the range <code>[1, MAX_VIEWING_KEY]</code>
(half the STARK curve order, exported by the SDK). A hex string compiles
fine but silently derives wrong channel keys - notes sent to you will never
decrypt.</li>
<li>Registering twice reverts. Check first, or use <code>autoRegister</code> below.</li>
</ul>
<h2 id="autoregister"><code>autoRegister</code><a class="anchor" href="#autoregister" aria-label="Link to this section">#</a></h2>
<p>Instead of registering as its own transaction, any build can bundle the
registration in automatically when the account has no viewing key on-chain
yet:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> { callAndProof } = <span class="hljs-keyword">await</span> transfers
  .<span class="hljs-title function_">build</span>({ <span class="hljs-attr">autoRegister</span>: <span class="hljs-literal">true</span> })
  .<span class="hljs-title function_">with</span>(tokenAddress, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-title function_">deposit</span>({ <span class="hljs-attr">amount</span>: <span class="hljs-number">100n</span> }))
  .<span class="hljs-title function_">surplusTo</span>(account.<span class="hljs-property">address</span>)
  .<span class="hljs-title function_">execute</span>({ provingBlockId })
</code></pre><p>If the account is already registered, <code>autoRegister</code> is a no-op - safe to
leave on for first-time-user flows (a claim page, an onboarding deposit).</p>
<table>
<thead>
<tr>
<th>Approach</th>
<th>When to use</th>
</tr>
</thead>
<tbody><tr>
<td><code>.register()</code></td>
<td>Explicit onboarding step, dedicated "register" button</td>
</tr>
<tr>
<td><code>autoRegister: true</code></td>
<td>Bundle registration into the user&#39;s first real operation</td>
</tr>
</tbody></table>
<p>Next: <a href="/sdk/deposit">Deposit</a> public ERC-20 tokens into the pool.</p>
`

export default html
