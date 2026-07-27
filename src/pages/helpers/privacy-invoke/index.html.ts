// metadata
export const version = "0.14.3"
export const title = "Anonymizer Contract Anatomy"
export const description =
  "The privacy_invoke pattern - how the pool calls external contracts and credits open notes"
export const githubLink = ""
export const githubLabel = ""

export const keywords = [
  "privacy_invoke",
  "helper",
  "invoke",
  "opennotedeposit",
  "anonymizing",
  "defi",
]

export const codes = [
  {
    fileName: "EchoHelper.cairo",
    code: "Ly8gQWRhcHRlZCBmcm9tIHN0YXJrbmV0LXByaXZhY3kgcGFja2FnZXMvcHJpdmFjeS9zcmMvdGVzdHMvbW9ja19pbnZva2VfcmV0dXJucy5jYWlybwovLyAoQXBhY2hlLTIuMCwgU3RhcmtXYXJlKS4gVGhlIHNtYWxsZXN0IHBvc3NpYmxlIGFub255bWl6ZXIgY29udHJhY3Q6IGl0IGVjaG9lcyB0aGUKLy8gZGVwb3NpdCBpbnN0cnVjdGlvbnMgaXQgaXMgZ2l2ZW4gYmFjayB0byB0aGUgcHJpdmFjeSBwb29sLgp1c2UgcHJpdmFjeTo6b2JqZWN0czo6T3Blbk5vdGVEZXBvc2l0OwoKI1tzdGFya25ldDo6aW50ZXJmYWNlXQpwdWIgdHJhaXQgSUVjaG9IZWxwZXI8VD4gewogICAgLy8vIFRoZSBlbnRyeSBwb2ludCBldmVyeSBhbm9ueW1pemVyIGNvbnRyYWN0IG11c3QgZXhwb3NlLgogICAgLy8vIFRoZSBwcml2YWN5IHBvb2wgY2FsbHMgaXQgdmlhIHRoZSBgSU5WT0tFX1NFTEVDVE9SYCBkdXJpbmcgYEludm9rZUV4dGVybmFsYC4KICAgIC8vLyBDYWxsZGF0YSBhZnRlciB0aGUgc2VsZWN0b3IgaXMgZGVzZXJpYWxpemVkIGludG8gdGhpcyBmdW5jdGlvbidzIHBhcmFtZXRlcnM7CiAgICAvLy8gdGhlIHJldHVybiB2YWx1ZSB0ZWxscyB0aGUgcG9vbCB3aGljaCBvcGVuIG5vdGVzIHRvIGNyZWRpdC4KICAgIGZuIHByaXZhY3lfaW52b2tlKHJlZiBzZWxmOiBULCBkZXBvc2l0czogU3BhbjxPcGVuTm90ZURlcG9zaXQ+KSAtPiBTcGFuPE9wZW5Ob3RlRGVwb3NpdD47Cn0KCiNbc3RhcmtuZXQ6OmNvbnRyYWN0XQpwdWIgbW9kIEVjaG9IZWxwZXIgewogICAgdXNlIHByaXZhY3k6Om9iamVjdHM6Ok9wZW5Ob3RlRGVwb3NpdDsKICAgIHVzZSBzdXBlcjo6SUVjaG9IZWxwZXI7CgogICAgI1tzdG9yYWdlXQogICAgc3RydWN0IFN0b3JhZ2Uge30KCiAgICAjW2NvbnN0cnVjdG9yXQogICAgZm4gY29uc3RydWN0b3IocmVmIHNlbGY6IENvbnRyYWN0U3RhdGUpIHt9CgogICAgI1thYmkoZW1iZWRfdjApXQogICAgcHViIGltcGwgRWNob0hlbHBlckltcGwgb2YgSUVjaG9IZWxwZXI8Q29udHJhY3RTdGF0ZT4gewogICAgICAgIGZuIHByaXZhY3lfaW52b2tlKAogICAgICAgICAgICByZWYgc2VsZjogQ29udHJhY3RTdGF0ZSwgZGVwb3NpdHM6IFNwYW48T3Blbk5vdGVEZXBvc2l0PiwKICAgICAgICApIC0+IFNwYW48T3Blbk5vdGVEZXBvc2l0PiB7CiAgICAgICAgICAgIGRlcG9zaXRzCiAgICAgICAgfQogICAgfQp9Cg==",
  },
]

const html = `<p>Anonymizer contracts (also called <strong>helper contracts</strong>) are how private funds
interact with the outside world - DEXs, lending vaults, escrows - without
revealing who is behind the interaction.</p>
<p>The pattern is a sandwich, executed atomically in one transaction:</p>
<pre><code>withdraw from pool  →  helper does something  →  deposit result to an open note
</code></pre><ol>
<li>The pool <strong>withdraws</strong> input tokens to the helper (a plain public transfer -
observers see the pool paid the helper, not who initiated it).</li>
<li>The pool calls the helper&#39;s <code>privacy_invoke</code> entry point via the protocol&#39;s
<code>INVOKE_SELECTOR</code>.</li>
<li>The helper does its work, approves the pool to pull the output tokens, and
<strong>returns a <code>Span&lt;OpenNoteDeposit&gt;</code></strong> - instructions telling the pool which
open notes to credit with which tokens and amounts.</li>
</ol>
<p>The output lands in an <strong>open note</strong>: its amount is public (it was measured
on-chain, so it could not be fixed at proof time), but its owner is still hidden.</p>
<h2 id="the-contract-every-helper-must-satisfy">The contract every helper must satisfy<a class="anchor" href="#the-contract-every-helper-must-satisfy" aria-label="Link to this section">#</a></h2>
<p>The pool deserializes your calldata into <code>privacy_invoke</code>&#39;s parameters - you are
free to design the signature after the first <code>operation</code>-style arguments - and it
deserializes your return value as <code>Span&lt;OpenNoteDeposit&gt;</code>:</p>
<pre><code class="language-cairo"><span class="hljs-comment">/// From privacy::objects</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">OpenNoteDeposit</span> {
    <span class="hljs-comment">/// The identifier of the open note to deposit to.</span>
    <span class="hljs-keyword">pub</span> note_id: felt252,
    <span class="hljs-comment">/// The ERC20 token contract to deposit.</span>
    <span class="hljs-keyword">pub</span> token: ContractAddress,
    <span class="hljs-comment">/// The amount of tokens to deposit.</span>
    <span class="hljs-keyword">pub</span> amount: <span class="hljs-type">u128</span>,
}
</code></pre><p>Here is the smallest possible helper - it simply echoes the deposit instructions
it is given back to the pool:</p>
<pre><code class="language-cairo"><span class="hljs-comment">// Adapted from starknet-privacy packages/privacy/src/tests/mock_invoke_returns.cairo</span>
<span class="hljs-comment">// (Apache-2.0, StarkWare). The smallest possible anonymizer contract: it echoes the</span>
<span class="hljs-comment">// deposit instructions it is given back to the privacy pool.</span>
<span class="hljs-keyword">use</span> privacy::objects::OpenNoteDeposit;

<span class="hljs-meta">#[starknet::interface]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">trait</span> <span class="hljs-title class_">IEchoHelper</span>&lt;T&gt; {
    <span class="hljs-comment">/// The entry point every anonymizer contract must expose.</span>
    <span class="hljs-comment">/// The privacy pool calls it via the \`INVOKE_SELECTOR\` during \`InvokeExternal\`.</span>
    <span class="hljs-comment">/// Calldata after the selector is deserialized into this function&#x27;s parameters;</span>
    <span class="hljs-comment">/// the return value tells the pool which open notes to credit.</span>
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">privacy_invoke</span>(<span class="hljs-keyword">ref</span> <span class="hljs-keyword">self</span>: T, deposits: Span&lt;OpenNoteDeposit&gt;) <span class="hljs-punctuation">-&gt;</span> Span&lt;OpenNoteDeposit&gt;;
}

<span class="hljs-meta">#[starknet::contract]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">mod</span> EchoHelper {
    <span class="hljs-keyword">use</span> privacy::objects::OpenNoteDeposit;
    <span class="hljs-keyword">use</span> super::IEchoHelper;

    <span class="hljs-meta">#[storage]</span>
    <span class="hljs-keyword">struct</span> <span class="hljs-title class_">Storage</span> {}

    <span class="hljs-meta">#[constructor]</span>
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">constructor</span>(<span class="hljs-keyword">ref</span> <span class="hljs-keyword">self</span>: ContractState) {}

    <span class="hljs-meta">#[abi(embed_v0)]</span>
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">impl</span> <span class="hljs-title class_">EchoHelperImpl</span> of IEchoHelper&lt;ContractState&gt; {
        <span class="hljs-keyword">fn</span> <span class="hljs-title function_">privacy_invoke</span>(
            <span class="hljs-keyword">ref</span> <span class="hljs-keyword">self</span>: ContractState, deposits: Span&lt;OpenNoteDeposit&gt;,
        ) <span class="hljs-punctuation">-&gt;</span> Span&lt;OpenNoteDeposit&gt; {
            deposits
        }
    }
}
</code></pre><p>Useless in production, but it shows the full contract surface: one entry point,
calldata in, <code>Span&lt;OpenNoteDeposit&gt;</code> out.</p>
<h2 id="rules-of-the-pattern">Rules of the pattern<a class="anchor" href="#rules-of-the-pattern" aria-label="Link to this section">#</a></h2>
<ul>
<li><strong>Return exactly a <code>Span&lt;OpenNoteDeposit&gt;</code></strong> - returning anything else (or
trailing garbage) makes the pool reject the call.</li>
<li><strong>Approve, don&#39;t transfer</strong> - the helper approves the pool to pull the output;
the pool executes the pull itself when applying the deposits.</li>
<li><strong>An empty span is valid</strong> - it means "credit nothing" (the escrow&#39;s Deposit
operation uses this: funds stay parked in the helper).</li>
<li><strong>Measure output by balance delta</strong> - real helpers record the output token
balance before and after the external call, so the credited amount is exactly
what arrived, whatever the external protocol did.</li>
<li><strong>One <code>invoke</code> per transaction</strong> - the protocol allows at most one external
invoke per pool transaction.</li>
</ul>
<p>The next two pages build real helpers on this skeleton: a DEX swap and a Vesu
lending integration.</p>
`

export default html
