// metadata
export const version = "0.14.3"
export const title = "Actions, Phases & Proofs"
export const description =
  "The phased action model, the per-token balance invariant, and how transactions are proven with Stwo"
export const githubLink = ""
export const githubLabel = ""

export const keywords = [
  "actions",
  "phases",
  "balance invariant",
  "stwo",
  "proof",
  "virtual execution",
]

export const codes = []

const html = `<p>Every pool transaction is a batch of <strong>client actions</strong>. Actions are grouped
into phases with a fixed ordering - a transaction may skip phases, but must
never go backwards:</p>
<table>
<thead>
<tr>
<th>Phase</th>
<th>Action</th>
<th>Effect on temp balance</th>
</tr>
</thead>
<tbody><tr>
<td>0</td>
<td><code>SetViewingKey</code></td>
<td>-</td>
</tr>
<tr>
<td>1</td>
<td><code>OpenChannel</code></td>
<td>-</td>
</tr>
<tr>
<td>2</td>
<td><code>OpenSubchannel</code></td>
<td>-</td>
</tr>
<tr>
<td>3</td>
<td><code>Deposit</code></td>
<td>+ amount</td>
</tr>
<tr>
<td>4</td>
<td><code>UseNote</code></td>
<td>+ note amount</td>
</tr>
<tr>
<td>5</td>
<td><code>CreateEncNote</code> / <code>CreateOpenNote</code></td>
<td>− amount</td>
</tr>
<tr>
<td>6</td>
<td><code>Withdraw</code></td>
<td>− amount</td>
</tr>
<tr>
<td>7</td>
<td><code>InvokeExternal</code> (at most once)</td>
<td>-</td>
</tr>
</tbody></table>
<p>The fixed ordering removes state-machine ambiguity: there is exactly one way to
encode a given semantic operation, which closes whole classes of ordering bugs.
<code>InvokeExternal</code> is the composability hook - it calls an anonymizer contract
(escrow, DEX adapter, lending) at most once per transaction.</p>
<h2 id="the-balance-invariant">The balance invariant<a class="anchor" href="#the-balance-invariant" aria-label="Link to this section">#</a></h2>
<p>Within one transaction, the contract tracks a <strong>temporary balance per token</strong>:
inflows (<code>Deposit</code>, <code>UseNote</code>) add, outflows (<code>CreateNote</code>, <code>Withdraw</code>)
subtract. Two rules are enforced:</p>
<ul>
<li>The balance may <strong>never go negative</strong> at any point.</li>
<li>Every token&#39;s balance must end at <strong>exactly zero</strong>.</li>
</ul>
<pre><code class="language-cairo"><span class="hljs-keyword">fn</span> <span class="hljs-title function_">subtract_balance</span>(<span class="hljs-keyword">ref</span> <span class="hljs-keyword">self</span>: TokenBalances, token: ContractAddress, amount: <span class="hljs-type">u128</span>) {
    <span class="hljs-keyword">let</span> (entry, current_balance) = <span class="hljs-keyword">self</span>.<span class="hljs-title function_ invoke__">entry</span>(key: token.<span class="hljs-title function_ invoke__">into</span>());
    <span class="hljs-keyword">let</span> <span class="hljs-variable">new_value</span> = current_balance
        .<span class="hljs-title function_ invoke__">checked_sub</span>(amount)
        .<span class="hljs-title function_ invoke__">expect</span>(errors::NEGATIVE_INTERMEDIATE_BALANCE);
    <span class="hljs-keyword">self</span> = entry.<span class="hljs-title function_ invoke__">finalize</span>(:new_value);
}
<span class="hljs-keyword">fn</span> <span class="hljs-title function_">assert_valid</span>(<span class="hljs-keyword">self</span>: SquashedTokenBalances) {
    <span class="hljs-keyword">for</span> (_token, _, balance) <span class="hljs-keyword">in</span> <span class="hljs-keyword">self</span>.<span class="hljs-title function_ invoke__">into_entries</span>() {
        <span class="hljs-title function_ invoke__">assert</span>(balance.<span class="hljs-title function_ invoke__">is_zero</span>(), errors::FINAL_BALANCE_MUST_BE_ZERO);
    }
}
</code></pre><p>No value is created, destroyed, or left unaccounted - a transfer of 30 from a
100-note <em>must</em> create outputs totaling 100 (30 to the recipient, 70 change).</p>
<h2 id="from-actions-to-an-on-chain-transaction">From actions to an on-chain transaction<a class="anchor" href="#from-actions-to-an-on-chain-transaction" aria-label="Link to this section">#</a></h2>
<pre><code>client builds actions
        │
        ▼
virtual Starknet execution          ← anchored to a recent block&#x27;s state
  (dedicated virtual OS,              snapshot; unsupported syscalls fail
   compiles client → server actions)  here, at proving time
        │
        ▼
Stwo proof generation               ← ~29 s (12-core / 46 GiB; machine-dependent)
        │
        ▼
submit tx (directly or via paymaster)
        │
        ▼
sequencer-level verification        ← proof checked before execution;
        │                             contract validates proof facts
        ▼
apply_actions: storage writes, token transfers, events
</code></pre><p>The proof is generated over a <strong>virtual Starknet execution environment</strong>: the
transaction runs against an anchored state snapshot of a recent block, using
the same Cairo logic the chain uses. That gives native storage semantics and
account-abstraction signature checks (<code>is_valid_signature</code>) for free.</p>
<p>On submission, the contract checks the <strong>proof facts</strong> before applying anything:</p>
<ul>
<li>the proof came from the expected program variant (<code>VIRTUAL_SNOS</code>)</li>
<li>the anchor block is recent - within <code>proof_validity_blocks</code> of the tip</li>
<li>the proven message hash matches the submitted actions exactly</li>
</ul>
<p>Stale proofs expire; mismatched actions are rejected; only then are storage
writes, ERC-20 transfers and events applied atomically.</p>
<p>Next: the escrowed key that makes all of this auditable -
<a href="/compliance">Compliance &amp; Auditing</a>.</p>
`

export default html
