// metadata
export const version = "0.14.3"
export const title = "Transfer"
export const description =
  "Spend private notes and transfer an amount to a recipient, with change back to you"
export const githubLink =
  "https://github.com/starkware-libs/starknet-privacy/blob/main/sdk/README.md"
export const githubLabel = ""

export const keywords = [
  "transfer",
  "notes",
  "inputs",
  "surplusTo",
  "change",
  "autoSelectNotes",
]

export const codes = []

const html = `<p>A private transfer spends one or more of your notes and creates a new note
for the recipient. Notes are UTXOs: consumed whole. If the inputs total more
than the transfer amount, the difference becomes a <strong>change note</strong> - and the
builder must be told who owns it.</p>
<p>Snippets assume <code>transfers</code>, <code>account</code> and <code>provider</code> from
<a href="/sdk/getting-started">Getting Started</a>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> bob = <span class="hljs-string">"0x05a1..."</span>

<span class="hljs-comment">// Find a note to spend (see Discovering Notes).</span>
<span class="hljs-keyword">const</span> { notes } = <span class="hljs-keyword">await</span> transfers.<span class="hljs-title function_">discoverNotes</span>({
  <span class="hljs-attr">tokens</span>: [<span class="hljs-title class_">BigInt</span>(tokenAddress)],
})
<span class="hljs-keyword">const</span> note = notes.<span class="hljs-title function_">get</span>(<span class="hljs-title class_">BigInt</span>(tokenAddress))![<span class="hljs-number">0</span>] <span class="hljs-comment">// e.g. a 100n note</span>

<span class="hljs-keyword">const</span> provingBlockId = (<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">getBlockNumber</span>()) - <span class="hljs-number">10</span>

<span class="hljs-keyword">const</span> { callAndProof } = <span class="hljs-keyword">await</span> transfers
  .<span class="hljs-title function_">build</span>({ <span class="hljs-attr">autoSetup</span>: <span class="hljs-literal">true</span> })
  .<span class="hljs-title function_">surplusTo</span>(account.<span class="hljs-property">address</span>) <span class="hljs-comment">// 50n change comes back to me as a new note</span>
  .<span class="hljs-title function_">with</span>(tokenAddress, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-title function_">inputs</span>(note).<span class="hljs-title function_">transfer</span>({ <span class="hljs-attr">recipient</span>: bob, <span class="hljs-attr">amount</span>: <span class="hljs-number">50n</span> }))
  .<span class="hljs-title function_">execute</span>({ provingBlockId })

<span class="hljs-keyword">const</span> proofDetails = callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>?.<span class="hljs-property">length</span>
  ? { <span class="hljs-attr">proofFacts</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>, <span class="hljs-attr">proof</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">data</span> }
  : {}
<span class="hljs-keyword">const</span> tx = <span class="hljs-keyword">await</span> account.<span class="hljs-title function_">execute</span>(callAndProof.<span class="hljs-property">call</span>, { <span class="hljs-attr">tip</span>: <span class="hljs-number">0n</span>, ...proofDetails })
<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">waitForTransaction</span>(tx.<span class="hljs-property">transaction_hash</span>)
</code></pre><h2 id="things-to-notice">Things to notice<a class="anchor" href="#things-to-notice" aria-label="Link to this section">#</a></h2>
<ul>
<li><code>.inputs(note)</code> selects exactly which notes to spend. Without it, set
<code>autoSelectNotes</code> in <code>build()</code> and let the SDK choose.</li>
<li><code>surplusTo(...)</code> is <strong>required whenever inputs may exceed outputs</strong>.
Spending a <code>100n</code> note to send <code>50n</code> without it throws
"no surplus recipient" at <code>execute()</code> time.</li>
<li>The change note belongs to whoever <code>surplusTo</code> names - and like every new
note, it matures 10 blocks after creation. Back-to-back transfers that
reuse change must wait out the maturity window.</li>
<li>The recipient must be registered and reachable - see
<a href="/sdk/setup-requirements">Channels &amp; Setup Requirements</a>. <code>autoSetup: true</code>
opens the channel and token subchannel if missing.</li>
</ul>
<h2 id="automatic-note-selection">Automatic note selection<a class="anchor" href="#automatic-note-selection" aria-label="Link to this section">#</a></h2>
<table>
<thead>
<tr>
<th><code>autoSelectNotes</code></th>
<th>Behavior</th>
</tr>
</thead>
<tbody><tr>
<td><code>"naive"</code></td>
<td>Smallest set of notes that covers the amount</td>
</tr>
<tr>
<td><code>"all"</code></td>
<td>Consume every note (consolidation) - always produces surplus</td>
</tr>
</tbody></table>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> { callAndProof } = <span class="hljs-keyword">await</span> transfers
  .<span class="hljs-title function_">build</span>({ <span class="hljs-attr">autoSelectNotes</span>: <span class="hljs-string">"naive"</span>, <span class="hljs-attr">autoDiscover</span>: { <span class="hljs-attr">notes</span>: <span class="hljs-string">"refresh"</span> } })
  .<span class="hljs-title function_">surplusTo</span>(account.<span class="hljs-property">address</span>)
  .<span class="hljs-title function_">with</span>(tokenAddress, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-title function_">transfer</span>({ <span class="hljs-attr">recipient</span>: bob, <span class="hljs-attr">amount</span>: <span class="hljs-number">50n</span> }))
  .<span class="hljs-title function_">execute</span>({ provingBlockId })
</code></pre><p>With <code>"all"</code>, <code>surplusTo</code> is effectively mandatory: it only avoids surplus
when the amounts match your balance exactly.</p>
<p>Next: <a href="/sdk/deposit-transfer-surplus">Deposit + Transfer</a> in a single transaction.</p>
`

export default html
