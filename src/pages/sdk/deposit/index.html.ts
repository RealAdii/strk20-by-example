// metadata
export const version = "0.14.3"
export const title = "Deposit"
export const description =
  "Approve the pool, then deposit public ERC-20 tokens into a private note"
export const githubLink =
  "https://github.com/starkware-libs/starknet-privacy/blob/main/sdk/README.md"
export const githubLabel = ""

export const keywords = ["deposit", "erc20", "approve", "surplusTo", "note", "maturity"]

export const codes = []

// Raw markdown source, for "View as Markdown" / "Copy for LLM".
export const markdown = `
A deposit moves public ERC-20 tokens into the pool and mints a private note.
The pool pulls tokens with \`transfer_from\` while the proof executes, so the
ERC-20 \`approve\` must already be visible on-chain - it is a **separate
transaction**, submitted and waited on first.

Snippets assume \`transfers\`, \`account\` and \`provider\` from
[Getting Started](/sdk/getting-started).

\`\`\`typescript
const poolAddress = process.env.POOL_ADDRESS!
const tokenAddress = "0x049d..." // any ERC-20
const amount = 100n

// Transaction 1 - approve the pool to pull tokens.
const approveTx = await account.execute(
  {
    contractAddress: tokenAddress,
    entrypoint: "approve",
    calldata: [poolAddress, amount.toString(), "0"],
  },
  { tip: 0n },
)
await provider.waitForTransaction(approveTx.transaction_hash)

// Transaction 2 - the private deposit.
// Re-fetch provingBlockId AFTER the approve lands, so the proof base
// is not older than the approval.
const provingBlockId = (await provider.getBlockNumber()) - 10

const { callAndProof } = await transfers
  .build({ autoSetup: true })
  .with(tokenAddress, (t) => t.deposit({ amount }))
  .surplusTo(account.address) // the deposited amount becomes my note
  .execute({ provingBlockId })

const proofDetails = callAndProof.proof.proofFacts?.length
  ? { proofFacts: callAndProof.proof.proofFacts, proof: callAndProof.proof.data }
  : {}
const tx = await account.execute(callAndProof.call, { tip: 0n, ...proofDetails })
await provider.waitForTransaction(tx.transaction_hash)
\`\`\`

## Things to notice

- **Two transactions, never one.** The pool's \`apply_actions\` entrypoint is
  reentrancy-guarded against sharing a transaction with other calls, so you
  cannot batch \`approve\` and the deposit into a single \`account.execute\`.
- The deposit omits \`recipient\`; \`surplusTo(account.address)\` directs the
  unassigned amount into a note owned by you. This is the shape that scales
  to deposit-and-transfer on the next page.
- Amounts are **bigint literals** (\`100n\`) in the token's smallest unit.
- \`autoSetup: true\` opens your self-channel and the token subchannel if they
  do not exist yet - a first deposit needs both.
- The new note **matures 10 blocks after creation**. Spending it earlier
  produces a proof the contract rejects with \`Note not mature\`.
- **Every deposit is screened.** FPI (the screening provider) screens the
  depositing address and signs each deposit, and the pool verifies that
  signature onchain - enforcement is part of the protocol since the v0.14.3
  upgrade. Wallet and hosted-proving flows handle this step for you; if a
  structurally valid deposit reverts, screening is the first thing to check.
  See [Compliance & Auditing](/compliance).

Next: [Transfer](/sdk/transfer) a note privately to another account.
`

const html = `<p>A deposit moves public ERC-20 tokens into the pool and mints a private note.
The pool pulls tokens with <code>transfer_from</code> while the proof executes, so the
ERC-20 <code>approve</code> must already be visible on-chain - it is a <strong>separate
transaction</strong>, submitted and waited on first.</p>
<p>Snippets assume <code>transfers</code>, <code>account</code> and <code>provider</code> from
<a href="/sdk/getting-started">Getting Started</a>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> poolAddress = process.<span class="hljs-property">env</span>.<span class="hljs-property">POOL_ADDRESS</span>!
<span class="hljs-keyword">const</span> tokenAddress = <span class="hljs-string">"0x049d..."</span> <span class="hljs-comment">// any ERC-20</span>
<span class="hljs-keyword">const</span> amount = <span class="hljs-number">100n</span>

<span class="hljs-comment">// Transaction 1 - approve the pool to pull tokens.</span>
<span class="hljs-keyword">const</span> approveTx = <span class="hljs-keyword">await</span> account.<span class="hljs-title function_">execute</span>(
  {
    <span class="hljs-attr">contractAddress</span>: tokenAddress,
    <span class="hljs-attr">entrypoint</span>: <span class="hljs-string">"approve"</span>,
    <span class="hljs-attr">calldata</span>: [poolAddress, amount.<span class="hljs-title function_">toString</span>(), <span class="hljs-string">"0"</span>],
  },
  { <span class="hljs-attr">tip</span>: <span class="hljs-number">0n</span> },
)
<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">waitForTransaction</span>(approveTx.<span class="hljs-property">transaction_hash</span>)

<span class="hljs-comment">// Transaction 2 - the private deposit.</span>
<span class="hljs-comment">// Re-fetch provingBlockId AFTER the approve lands, so the proof base</span>
<span class="hljs-comment">// is not older than the approval.</span>
<span class="hljs-keyword">const</span> provingBlockId = (<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">getBlockNumber</span>()) - <span class="hljs-number">10</span>

<span class="hljs-keyword">const</span> { callAndProof } = <span class="hljs-keyword">await</span> transfers
  .<span class="hljs-title function_">build</span>({ <span class="hljs-attr">autoSetup</span>: <span class="hljs-literal">true</span> })
  .<span class="hljs-title function_">with</span>(tokenAddress, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-title function_">deposit</span>({ amount }))
  .<span class="hljs-title function_">surplusTo</span>(account.<span class="hljs-property">address</span>) <span class="hljs-comment">// the deposited amount becomes my note</span>
  .<span class="hljs-title function_">execute</span>({ provingBlockId })

<span class="hljs-keyword">const</span> proofDetails = callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>?.<span class="hljs-property">length</span>
  ? { <span class="hljs-attr">proofFacts</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>, <span class="hljs-attr">proof</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">data</span> }
  : {}
<span class="hljs-keyword">const</span> tx = <span class="hljs-keyword">await</span> account.<span class="hljs-title function_">execute</span>(callAndProof.<span class="hljs-property">call</span>, { <span class="hljs-attr">tip</span>: <span class="hljs-number">0n</span>, ...proofDetails })
<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">waitForTransaction</span>(tx.<span class="hljs-property">transaction_hash</span>)
</code></pre><h2 id="things-to-notice">Things to notice<a class="anchor" href="#things-to-notice" aria-label="Link to this section">#</a></h2>
<ul>
<li><strong>Two transactions, never one.</strong> The pool&#39;s <code>apply_actions</code> entrypoint is
reentrancy-guarded against sharing a transaction with other calls, so you
cannot batch <code>approve</code> and the deposit into a single <code>account.execute</code>.</li>
<li>The deposit omits <code>recipient</code>; <code>surplusTo(account.address)</code> directs the
unassigned amount into a note owned by you. This is the shape that scales
to deposit-and-transfer on the next page.</li>
<li>Amounts are <strong>bigint literals</strong> (<code>100n</code>) in the token&#39;s smallest unit.</li>
<li><code>autoSetup: true</code> opens your self-channel and the token subchannel if they
do not exist yet - a first deposit needs both.</li>
<li>The new note <strong>matures 10 blocks after creation</strong>. Spending it earlier
produces a proof the contract rejects with <code>Note not mature</code>.</li>
<li><strong>Every deposit is screened.</strong> FPI (the screening provider) screens the
depositing address and signs each deposit, and the pool verifies that
signature onchain - enforcement is part of the protocol since the v0.14.3
upgrade. Wallet and hosted-proving flows handle this step for you; if a
structurally valid deposit reverts, screening is the first thing to check.
See <a href="/compliance">Compliance &amp; Auditing</a>.</li>
</ul>
<p>Next: <a href="/sdk/transfer">Transfer</a> a note privately to another account.</p>
`

export default html
