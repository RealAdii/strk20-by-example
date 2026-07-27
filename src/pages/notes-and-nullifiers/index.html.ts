// metadata
export const version = "0.14.3"
export const title = "Notes & Nullifiers"
export const description =
  "The UTXO note model - how private balances are stored, spent and protected from double-spending"
export const githubLink = ""
export const githubLabel = ""

export const keywords = [
  "note",
  "nullifier",
  "utxo",
  "open note",
  "double-spend",
  "poseidon",
]

export const codes = []

// Raw markdown source, for "View as Markdown" / "Copy for LLM".
export const markdown = `
A **note** is the unit of private balance inside the pool. It is an immutable
record of three things:

- **Owner** - a Starknet address, authorized to spend by its account signature
  plus knowledge of its private viewing key
- **Token** - the ERC-20 contract address
- **Amount** - a 128-bit value, stored encrypted on-chain

## Spending is all-or-nothing (UTXO)

Notes cannot be partially spent. To pay 30 out of a 100-token note, you consume
the whole note and create two new ones:

\`\`\`
        ┌────────────────┐        spend        ┌──────────────────────┐
Alice ──│ note: 100 USDC │──────────────────►  │ note: 30 USDC → Bob  │
        └────────────────┘  publish nullifier  │ note: 70 USDC → Alice│ (change)
                                               └──────────────────────┘
\`\`\`

This is exactly Bitcoin's UTXO model, but every input and output is encrypted.
A zero-knowledge proof guarantees the amounts balance without revealing them.

## Open notes

An **open note** deliberately skips amount encryption. It uses a
protocol-reserved salt, so the stored payload is plaintext, and its amount can
be filled in _after_ proof generation:

- salt = \`OPEN_NOTE_SALT\` (= 1); encrypted notes always use salt ≥ 2
- amount is zero while awaiting deposit, then the plaintext filled amount
- token address is stored in the clear

Open notes exist for DeFi: a swap's output amount is only known at execution
time, long after the client proved its transaction. An anonymizer contract fills the
open note with the actual output, which then becomes spendable private balance.

## Where a note lives

Notes are not stored in one global list. Each note's storage location is
derived from the **channel key** (a secret shared by sender and recipient), the
token, and a sequential index inside the channel's per-token subchannel:

\`\`\`cairo
/// \`note_id = h(NOTE_ID_TAG, channel_key, token, index, 0)\`
pub(crate) fn compute_note_id(
    channel_key: felt252, token: ContractAddress, index: usize,
) -> felt252 {
    hash([NOTE_ID_TAG, channel_key, token.into(), index.into(), Zero::zero()].span())
}
\`\`\`

Indices are dense and sequential (0, 1, 2, …), and every note cell is
**WriteOnce** - written once, never mutated. Without the channel key, note
locations are indistinguishable from random storage slots.

## Nullifiers

Spending a note does not delete it. Instead the spender publishes a
**nullifier** - a one-way Poseidon hash bound to the note and to the owner's
private viewing key:

\`\`\`cairo
/// \`nullifier = h(NULLIFIER_TAG, channel_key, token, index, 0, owner_private_key)\`
pub(crate) fn compute_nullifier(
    channel_key: felt252, token: ContractAddress, index: usize, owner_private_key: felt252,
) -> felt252 {
    hash(
        [NULLIFIER_TAG, channel_key, token.into(), index.into(), Zero::zero(), owner_private_key]
            .span(),
    )
}
\`\`\`

Three properties make this work:

| Property      | Meaning                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------- |
| Deterministic | The same note always produces the same nullifier - no way to spend twice under different nullifiers |
| Unique        | Exactly one valid nullifier per note; the contract rejects any repeat                               |
| Unlinkable    | Without the owner's viewing key, a published nullifier cannot be matched to any note                |

Note the asymmetry: because the nullifier includes the _owner's_ private
viewing key, even the sender who created a note cannot compute its nullifier -
so a sender cannot watch for when their payment gets spent.

Next: how keys encrypt all of this - [Encryption & Viewing Keys](/viewing-keys).
`

const html = `<p>A <strong>note</strong> is the unit of private balance inside the pool. It is an immutable
record of three things:</p>
<ul>
<li><strong>Owner</strong> - a Starknet address, authorized to spend by its account signature
plus knowledge of its private viewing key</li>
<li><strong>Token</strong> - the ERC-20 contract address</li>
<li><strong>Amount</strong> - a 128-bit value, stored encrypted on-chain</li>
</ul>
<h2 id="spending-is-all-or-nothing-utxo">Spending is all-or-nothing (UTXO)<a class="anchor" href="#spending-is-all-or-nothing-utxo" aria-label="Link to this section">#</a></h2>
<p>Notes cannot be partially spent. To pay 30 out of a 100-token note, you consume
the whole note and create two new ones:</p>
<pre><code>        ┌────────────────┐        spend        ┌──────────────────────┐
Alice ──│ note: 100 USDC │──────────────────►  │ note: 30 USDC → Bob  │
        └────────────────┘  publish nullifier  │ note: 70 USDC → Alice│ (change)
                                               └──────────────────────┘
</code></pre><p>This is exactly Bitcoin&#39;s UTXO model, but every input and output is encrypted.
A zero-knowledge proof guarantees the amounts balance without revealing them.</p>
<h2 id="open-notes">Open notes<a class="anchor" href="#open-notes" aria-label="Link to this section">#</a></h2>
<p>An <strong>open note</strong> deliberately skips amount encryption. It uses a
protocol-reserved salt, so the stored payload is plaintext, and its amount can
be filled in <em>after</em> proof generation:</p>
<ul>
<li>salt = <code>OPEN_NOTE_SALT</code> (= 1); encrypted notes always use salt ≥ 2</li>
<li>amount is zero while awaiting deposit, then the plaintext filled amount</li>
<li>token address is stored in the clear</li>
</ul>
<p>Open notes exist for DeFi: a swap&#39;s output amount is only known at execution
time, long after the client proved its transaction. An anonymizer contract fills the
open note with the actual output, which then becomes spendable private balance.</p>
<h2 id="where-a-note-lives">Where a note lives<a class="anchor" href="#where-a-note-lives" aria-label="Link to this section">#</a></h2>
<p>Notes are not stored in one global list. Each note&#39;s storage location is
derived from the <strong>channel key</strong> (a secret shared by sender and recipient), the
token, and a sequential index inside the channel&#39;s per-token subchannel:</p>
<pre><code class="language-cairo"><span class="hljs-comment">/// \`note_id = h(NOTE_ID_TAG, channel_key, token, index, 0)\`</span>
<span class="hljs-title function_ invoke__">pub</span>(<span class="hljs-keyword">crate</span>) <span class="hljs-keyword">fn</span> <span class="hljs-title function_">compute_note_id</span>(
    channel_key: felt252, token: ContractAddress, index: <span class="hljs-type">usize</span>,
) <span class="hljs-punctuation">-&gt;</span> felt252 {
    <span class="hljs-title function_ invoke__">hash</span>([NOTE_ID_TAG, channel_key, token.<span class="hljs-title function_ invoke__">into</span>(), index.<span class="hljs-title function_ invoke__">into</span>(), Zero::<span class="hljs-title function_ invoke__">zero</span>()].<span class="hljs-title function_ invoke__">span</span>())
}
</code></pre><p>Indices are dense and sequential (0, 1, 2, …), and every note cell is
<strong>WriteOnce</strong> - written once, never mutated. Without the channel key, note
locations are indistinguishable from random storage slots.</p>
<h2 id="nullifiers">Nullifiers<a class="anchor" href="#nullifiers" aria-label="Link to this section">#</a></h2>
<p>Spending a note does not delete it. Instead the spender publishes a
<strong>nullifier</strong> - a one-way Poseidon hash bound to the note and to the owner&#39;s
private viewing key:</p>
<pre><code class="language-cairo"><span class="hljs-comment">/// \`nullifier = h(NULLIFIER_TAG, channel_key, token, index, 0, owner_private_key)\`</span>
<span class="hljs-title function_ invoke__">pub</span>(<span class="hljs-keyword">crate</span>) <span class="hljs-keyword">fn</span> <span class="hljs-title function_">compute_nullifier</span>(
    channel_key: felt252, token: ContractAddress, index: <span class="hljs-type">usize</span>, owner_private_key: felt252,
) <span class="hljs-punctuation">-&gt;</span> felt252 {
    <span class="hljs-title function_ invoke__">hash</span>(
        [NULLIFIER_TAG, channel_key, token.<span class="hljs-title function_ invoke__">into</span>(), index.<span class="hljs-title function_ invoke__">into</span>(), Zero::<span class="hljs-title function_ invoke__">zero</span>(), owner_private_key]
            .<span class="hljs-title function_ invoke__">span</span>(),
    )
}
</code></pre><p>Three properties make this work:</p>
<table>
<thead>
<tr>
<th>Property</th>
<th>Meaning</th>
</tr>
</thead>
<tbody><tr>
<td>Deterministic</td>
<td>The same note always produces the same nullifier - no way to spend twice under different nullifiers</td>
</tr>
<tr>
<td>Unique</td>
<td>Exactly one valid nullifier per note; the contract rejects any repeat</td>
</tr>
<tr>
<td>Unlinkable</td>
<td>Without the owner&#39;s viewing key, a published nullifier cannot be matched to any note</td>
</tr>
</tbody></table>
<p>Note the asymmetry: because the nullifier includes the <em>owner&#39;s</em> private
viewing key, even the sender who created a note cannot compute its nullifier -
so a sender cannot watch for when their payment gets spent.</p>
<p>Next: how keys encrypt all of this - <a href="/viewing-keys">Encryption &amp; Viewing Keys</a>.</p>
`

export default html
