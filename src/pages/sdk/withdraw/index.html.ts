// metadata
export const version = "0.14.3"
export const title = "Withdraw"
export const description =
  "Withdraw private notes back to a public Starknet address as ERC-20 tokens"
export const githubLink =
  "https://github.com/starkware-libs/starknet-privacy/blob/main/sdk/README.md"
export const githubLabel = ""

export const keywords = [
  "withdraw",
  "erc20",
  "public",
  "notes",
  "maturity",
  "surplusTo",
]

export const codes = []

// Raw markdown source, for "View as Markdown" / "Copy for LLM".
export const markdown = `
A withdrawal spends private notes and sends plain ERC-20 tokens to a public
Starknet address. It is the exit door of the pool - and the one place where
an amount and a recipient become publicly visible again.

Snippets assume \`transfers\`, \`account\` and \`provider\` from
[Getting Started](/sdk/getting-started).

\`\`\`typescript
const { notes } = await transfers.discoverNotes({
  tokens: [BigInt(tokenAddress)],
})
const note = notes.get(BigInt(tokenAddress))![0] // e.g. a 100n note

const provingBlockId = (await provider.getBlockNumber()) - 10

const { callAndProof } = await transfers
  .build()
  .surplusTo(account.address) // 70n stays private as a change note
  .with(tokenAddress, (t) =>
    t.inputs(note).withdraw({ amount: 30n, recipient: account.address }),
  )
  .execute({ provingBlockId })

const proofDetails = callAndProof.proof.proofFacts?.length
  ? { proofFacts: callAndProof.proof.proofFacts, proof: callAndProof.proof.data }
  : {}
const tx = await account.execute(callAndProof.call, { tip: 0n, ...proofDetails })
await provider.waitForTransaction(tx.transaction_hash)
\`\`\`

## Things to notice

- \`recipient\` is the **public address** that receives the ERC-20 transfer.
  It can be anyone, not just yourself - paying a merchant directly from the
  pool is a single withdraw.
- **Note maturity applies to the inputs.** A note created fewer than 10
  blocks ago cannot be spent; the SDK will happily build the proof, but the
  contract rejects it with \`Note not mature\`. Proving against
  \`currentBlock - 10\` guarantees every note in your registry has matured at
  the proof base.
- The change (\`70n\` here) stays in the pool as a fresh private note via
  \`surplusTo\` - withdrawing does not force you to exit a whole note.
- Privacy consideration: the contract's public \`transfer\` call reveals token,
  amount and recipient. What stays hidden is _which_ notes funded it. Check
  \`ExecuteResult.warnings\` for \`USER_LINKAGE\` before submitting.

Next: [Multi-Operation Batches](/sdk/multi-op-batch) - many operations and
many tokens in one transaction.
`

const html = `<p>A withdrawal spends private notes and sends plain ERC-20 tokens to a public
Starknet address. It is the exit door of the pool - and the one place where
an amount and a recipient become publicly visible again.</p>
<p>Snippets assume <code>transfers</code>, <code>account</code> and <code>provider</code> from
<a href="/sdk/getting-started">Getting Started</a>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> { notes } = <span class="hljs-keyword">await</span> transfers.<span class="hljs-title function_">discoverNotes</span>({
  <span class="hljs-attr">tokens</span>: [<span class="hljs-title class_">BigInt</span>(tokenAddress)],
})
<span class="hljs-keyword">const</span> note = notes.<span class="hljs-title function_">get</span>(<span class="hljs-title class_">BigInt</span>(tokenAddress))![<span class="hljs-number">0</span>] <span class="hljs-comment">// e.g. a 100n note</span>

<span class="hljs-keyword">const</span> provingBlockId = (<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">getBlockNumber</span>()) - <span class="hljs-number">10</span>

<span class="hljs-keyword">const</span> { callAndProof } = <span class="hljs-keyword">await</span> transfers
  .<span class="hljs-title function_">build</span>()
  .<span class="hljs-title function_">surplusTo</span>(account.<span class="hljs-property">address</span>) <span class="hljs-comment">// 70n stays private as a change note</span>
  .<span class="hljs-title function_">with</span>(tokenAddress, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span>
    t.<span class="hljs-title function_">inputs</span>(note).<span class="hljs-title function_">withdraw</span>({ <span class="hljs-attr">amount</span>: <span class="hljs-number">30n</span>, <span class="hljs-attr">recipient</span>: account.<span class="hljs-property">address</span> }),
  )
  .<span class="hljs-title function_">execute</span>({ provingBlockId })

<span class="hljs-keyword">const</span> proofDetails = callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>?.<span class="hljs-property">length</span>
  ? { <span class="hljs-attr">proofFacts</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>, <span class="hljs-attr">proof</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">data</span> }
  : {}
<span class="hljs-keyword">const</span> tx = <span class="hljs-keyword">await</span> account.<span class="hljs-title function_">execute</span>(callAndProof.<span class="hljs-property">call</span>, { <span class="hljs-attr">tip</span>: <span class="hljs-number">0n</span>, ...proofDetails })
<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">waitForTransaction</span>(tx.<span class="hljs-property">transaction_hash</span>)
</code></pre><h2 id="things-to-notice">Things to notice<a class="anchor" href="#things-to-notice" aria-label="Link to this section">#</a></h2>
<ul>
<li><code>recipient</code> is the <strong>public address</strong> that receives the ERC-20 transfer.
It can be anyone, not just yourself - paying a merchant directly from the
pool is a single withdraw.</li>
<li><strong>Note maturity applies to the inputs.</strong> A note created fewer than 10
blocks ago cannot be spent; the SDK will happily build the proof, but the
contract rejects it with <code>Note not mature</code>. Proving against
<code>currentBlock - 10</code> guarantees every note in your registry has matured at
the proof base.</li>
<li>The change (<code>70n</code> here) stays in the pool as a fresh private note via
<code>surplusTo</code> - withdrawing does not force you to exit a whole note.</li>
<li>Privacy consideration: the contract&#39;s public <code>transfer</code> call reveals token,
amount and recipient. What stays hidden is <em>which</em> notes funded it. Check
<code>ExecuteResult.warnings</code> for <code>USER_LINKAGE</code> before submitting.</li>
</ul>
<p>Next: <a href="/sdk/multi-op-batch">Multi-Operation Batches</a> - many operations and
many tokens in one transaction.</p>
`

export default html
