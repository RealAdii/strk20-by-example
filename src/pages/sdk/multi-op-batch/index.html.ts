// metadata
export const version = "0.14.3"
export const title = "Multi-Operation Batches"
export const description =
  "Chain several operations on one token and several tokens in a single transaction"
export const githubLink =
  "https://github.com/starkware-libs/starknet-privacy/blob/main/sdk/README.md"
export const githubLabel = ""

export const keywords = [
  "batch",
  "multi-token",
  "compose",
  "builder",
  "atomic",
  "invoke",
]

export const codes = []

const html = `<p>One build = one transaction = one proof. Inside it you can chain any number
of operations on a token, and any number of tokens via repeated <code>.with(...)</code>
blocks. Everything settles atomically.</p>
<p>Snippets assume <code>transfers</code>, <code>account</code> and <code>provider</code> from
<a href="/sdk/getting-started">Getting Started</a>.</p>
<h2 id="several-operations-one-token">Several operations, one token<a class="anchor" href="#several-operations-one-token" aria-label="Link to this section">#</a></h2>
<p>Spend a 100n note: 40n to Alice, 30n withdrawn to public, 30n change.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> provingBlockId = (<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">getBlockNumber</span>()) - <span class="hljs-number">10</span>

<span class="hljs-keyword">const</span> { callAndProof } = <span class="hljs-keyword">await</span> transfers
  .<span class="hljs-title function_">build</span>({ <span class="hljs-attr">autoSetup</span>: <span class="hljs-literal">true</span> })
  .<span class="hljs-title function_">surplusTo</span>(account.<span class="hljs-property">address</span>) <span class="hljs-comment">// absorbs the 30n remainder</span>
  .<span class="hljs-title function_">with</span>(tokenAddress, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span>
    t
      .<span class="hljs-title function_">inputs</span>(note100)
      .<span class="hljs-title function_">transfer</span>({ <span class="hljs-attr">recipient</span>: alice, <span class="hljs-attr">amount</span>: <span class="hljs-number">40n</span> })
      .<span class="hljs-title function_">withdraw</span>({ <span class="hljs-attr">amount</span>: <span class="hljs-number">30n</span>, <span class="hljs-attr">recipient</span>: account.<span class="hljs-property">address</span> }),
  )
  .<span class="hljs-title function_">execute</span>({ provingBlockId })

<span class="hljs-keyword">const</span> proofDetails = callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>?.<span class="hljs-property">length</span>
  ? { <span class="hljs-attr">proofFacts</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>, <span class="hljs-attr">proof</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">data</span> }
  : {}
<span class="hljs-keyword">const</span> tx = <span class="hljs-keyword">await</span> account.<span class="hljs-title function_">execute</span>(callAndProof.<span class="hljs-property">call</span>, { <span class="hljs-attr">tip</span>: <span class="hljs-number">0n</span>, ...proofDetails })
<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">waitForTransaction</span>(tx.<span class="hljs-property">transaction_hash</span>)
</code></pre><h2 id="several-tokens-one-transaction">Several tokens, one transaction<a class="anchor" href="#several-tokens-one-transaction" aria-label="Link to this section">#</a></h2>
<p>Each token gets its own <code>.with(...)</code> block with its own inputs and outputs.
The per-token balance sheets are independent; <code>surplusTo</code> at the top level
covers all of them.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> { callAndProof } = <span class="hljs-keyword">await</span> transfers
  .<span class="hljs-title function_">build</span>({ <span class="hljs-attr">autoSetup</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoDiscover</span>: { <span class="hljs-attr">notes</span>: <span class="hljs-string">"refresh"</span> } })
  .<span class="hljs-title function_">surplusTo</span>(account.<span class="hljs-property">address</span>)
  .<span class="hljs-title function_">with</span>(<span class="hljs-variable constant_">STRK</span>, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-title function_">inputs</span>(strkNote).<span class="hljs-title function_">transfer</span>({ <span class="hljs-attr">recipient</span>: alice, <span class="hljs-attr">amount</span>: <span class="hljs-number">40n</span> }))
  .<span class="hljs-title function_">with</span>(<span class="hljs-variable constant_">ETH</span>, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span>
    t.<span class="hljs-title function_">inputs</span>(ethNote).<span class="hljs-title function_">withdraw</span>({ <span class="hljs-attr">amount</span>: <span class="hljs-number">10n</span>, <span class="hljs-attr">recipient</span>: account.<span class="hljs-property">address</span> }),
  )
  .<span class="hljs-title function_">execute</span>({ provingBlockId })
</code></pre><h2 id="things-to-notice">Things to notice<a class="anchor" href="#things-to-notice" aria-label="Link to this section">#</a></h2>
<ul>
<li>Balance-sheet rule holds <strong>per token</strong>: inputs + deposits must cover
transfers + withdrawals; <code>surplusTo</code> takes each token&#39;s remainder. A
per-token override exists too: <code>t.surplusTo(...)</code> inside the block.</li>
<li>At most <strong>one <code>invoke()</code> per transaction</strong> - the pool contract enforces a
single external call per <code>apply_actions</code>. The builder errors if you chain
two.</li>
<li>Larger batches mean larger proofs. Very large recipient lists can hit
proof-size limits; wrap the batch in a try/catch and fall back to
per-recipient transactions, waiting out the 10-block change-note maturity
between them.</li>
<li>For batches to recipients who may lack channels, do not rely on
<code>autoSetup</code> - pre-flight each recipient instead, as shown on the next page.</li>
</ul>
<p>Next: <a href="/sdk/setup-requirements">Channels &amp; Setup Requirements</a> - knowing what
setup a recipient needs.</p>
`

export default html
