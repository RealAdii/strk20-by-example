// metadata
export const version = "0.14.3"
export const title = "Deposit + Transfer"
export const description =
  "Deposit and transfer in one transaction, with surplusTo directing the remainder"
export const githubLink =
  "https://github.com/starkware-libs/starknet-privacy/blob/main/sdk/README.md"
export const githubLabel = ""

export const keywords = [
  "deposit",
  "transfer",
  "surplusTo",
  "compose",
  "batch",
  "change",
]

export const codes = []

// Raw markdown source, for "View as Markdown" / "Copy for LLM".
export const markdown = `
Operations on the same token compose inside one \`.with(...)\` block, and the
whole batch settles atomically in one transaction. The classic case: deposit
100 and immediately transfer 60 to Bob. Omit the \`recipient\` on the deposit
and let \`surplusTo\` direct whatever is left - the SDK resolves the
intermediate steps.

Snippets assume \`transfers\`, \`account\` and \`provider\` from
[Getting Started](/sdk/getting-started). The ERC-20 \`approve\` is still a
separate transaction first (see [Deposit](/sdk/deposit)).

\`\`\`typescript
// Transaction 1 - approve (identical to the Deposit page).
const approveTx = await account.execute(
  {
    contractAddress: tokenAddress,
    entrypoint: "approve",
    calldata: [poolAddress, 100n.toString(), "0"],
  },
  { tip: 0n },
)
await provider.waitForTransaction(approveTx.transaction_hash)

// Transaction 2 - deposit 100, transfer 60, keep 40.
const provingBlockId = (await provider.getBlockNumber()) - 10

const { callAndProof } = await transfers
  .build({ autoSetup: true })
  .surplusTo(account.address) // the 40n remainder becomes my note
  .with(tokenAddress, (t) =>
    t.deposit({ amount: 100n }).transfer({ recipient: bob, amount: 60n }),
  )
  .execute({ provingBlockId })

const proofDetails = callAndProof.proof.proofFacts?.length
  ? { proofFacts: callAndProof.proof.proofFacts, proof: callAndProof.proof.data }
  : {}
const tx = await account.execute(callAndProof.call, { tip: 0n, ...proofDetails })
await provider.waitForTransaction(tx.transaction_hash)
\`\`\`

## Things to notice

- The deposit has **no \`recipient\`**. Its 100n enters the token's balance
  sheet for this transaction; the transfer takes 60n; \`surplusTo\` claims the
  remaining 40n. Pinning \`recipient\` on the deposit would instead lock the
  full 100n into a note and force the transfer to find other inputs.
- Bob's 60n note is spendable by Bob after 10 blocks; your 40n surplus note
  likewise. The transfer itself needs **no** maturity wait - the deposited
  funds are consumed within the same transaction, never as a note.
- Everything is atomic: if the transfer cannot be resolved, no deposit
  happens either.
- Balance-sheet rule per token: deposits + inputs must cover transfers +
  withdrawals, with \`surplusTo\` absorbing any remainder.

Next: [Withdraw](/sdk/withdraw) private funds back to a public address.
`

const html = `<p>Operations on the same token compose inside one <code>.with(...)</code> block, and the
whole batch settles atomically in one transaction. The classic case: deposit
100 and immediately transfer 60 to Bob. Omit the <code>recipient</code> on the deposit
and let <code>surplusTo</code> direct whatever is left - the SDK resolves the
intermediate steps.</p>
<p>Snippets assume <code>transfers</code>, <code>account</code> and <code>provider</code> from
<a href="/sdk/getting-started">Getting Started</a>. The ERC-20 <code>approve</code> is still a
separate transaction first (see <a href="/sdk/deposit">Deposit</a>).</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Transaction 1 - approve (identical to the Deposit page).</span>
<span class="hljs-keyword">const</span> approveTx = <span class="hljs-keyword">await</span> account.<span class="hljs-title function_">execute</span>(
  {
    <span class="hljs-attr">contractAddress</span>: tokenAddress,
    <span class="hljs-attr">entrypoint</span>: <span class="hljs-string">"approve"</span>,
    <span class="hljs-attr">calldata</span>: [poolAddress, <span class="hljs-number">100n</span>.<span class="hljs-title function_">toString</span>(), <span class="hljs-string">"0"</span>],
  },
  { <span class="hljs-attr">tip</span>: <span class="hljs-number">0n</span> },
)
<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">waitForTransaction</span>(approveTx.<span class="hljs-property">transaction_hash</span>)

<span class="hljs-comment">// Transaction 2 - deposit 100, transfer 60, keep 40.</span>
<span class="hljs-keyword">const</span> provingBlockId = (<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">getBlockNumber</span>()) - <span class="hljs-number">10</span>

<span class="hljs-keyword">const</span> { callAndProof } = <span class="hljs-keyword">await</span> transfers
  .<span class="hljs-title function_">build</span>({ <span class="hljs-attr">autoSetup</span>: <span class="hljs-literal">true</span> })
  .<span class="hljs-title function_">surplusTo</span>(account.<span class="hljs-property">address</span>) <span class="hljs-comment">// the 40n remainder becomes my note</span>
  .<span class="hljs-title function_">with</span>(tokenAddress, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span>
    t.<span class="hljs-title function_">deposit</span>({ <span class="hljs-attr">amount</span>: <span class="hljs-number">100n</span> }).<span class="hljs-title function_">transfer</span>({ <span class="hljs-attr">recipient</span>: bob, <span class="hljs-attr">amount</span>: <span class="hljs-number">60n</span> }),
  )
  .<span class="hljs-title function_">execute</span>({ provingBlockId })

<span class="hljs-keyword">const</span> proofDetails = callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>?.<span class="hljs-property">length</span>
  ? { <span class="hljs-attr">proofFacts</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">proofFacts</span>, <span class="hljs-attr">proof</span>: callAndProof.<span class="hljs-property">proof</span>.<span class="hljs-property">data</span> }
  : {}
<span class="hljs-keyword">const</span> tx = <span class="hljs-keyword">await</span> account.<span class="hljs-title function_">execute</span>(callAndProof.<span class="hljs-property">call</span>, { <span class="hljs-attr">tip</span>: <span class="hljs-number">0n</span>, ...proofDetails })
<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">waitForTransaction</span>(tx.<span class="hljs-property">transaction_hash</span>)
</code></pre><h2 id="things-to-notice">Things to notice<a class="anchor" href="#things-to-notice" aria-label="Link to this section">#</a></h2>
<ul>
<li>The deposit has <strong>no <code>recipient</code></strong>. Its 100n enters the token&#39;s balance
sheet for this transaction; the transfer takes 60n; <code>surplusTo</code> claims the
remaining 40n. Pinning <code>recipient</code> on the deposit would instead lock the
full 100n into a note and force the transfer to find other inputs.</li>
<li>Bob&#39;s 60n note is spendable by Bob after 10 blocks; your 40n surplus note
likewise. The transfer itself needs <strong>no</strong> maturity wait - the deposited
funds are consumed within the same transaction, never as a note.</li>
<li>Everything is atomic: if the transfer cannot be resolved, no deposit
happens either.</li>
<li>Balance-sheet rule per token: deposits + inputs must cover transfers +
withdrawals, with <code>surplusTo</code> absorbing any remainder.</li>
</ul>
<p>Next: <a href="/sdk/withdraw">Withdraw</a> private funds back to a public address.</p>
`

export default html
