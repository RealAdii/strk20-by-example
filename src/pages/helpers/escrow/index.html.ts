// metadata
export const version = "0.14.3"
export const title = "Escrow"
export const description =
  "A deferred-delivery escrow anonymizer contract - send privately to someone who has not registered yet"
export const githubLink = ""
export const githubLabel = ""

export const keywords = [
  "escrow",
  "helper",
  "commitment",
  "claim",
  "secret",
  "privacy_invoke",
]

export const codes = [
  {
    fileName: "Escrow.cairo",
    code: "Ly8gQWRhcHRlZCBmcm9tIHN0YXJrbmV0LXByaXZhY3kgcGFja2FnZXMvZXNjcm93L3NyYy9lc2Nyb3cuY2Fpcm8gKEFwYWNoZS0yLjAsIFN0YXJrV2FyZSkKdXNlIHByaXZhY3k6Om9iamVjdHM6Ok9wZW5Ob3RlRGVwb3NpdDsKdXNlIHN0YXJrbmV0OjpDb250cmFjdEFkZHJlc3M7CgovLy8gRW50cnkgc3RvcmVkIHBlciBjb21taXRtZW50IGluIHRoZSBlc2Nyb3cuCiNbZGVyaXZlKFNlcmRlLCBDb3B5LCBEcm9wLCBQYXJ0aWFsRXEsIERlYnVnLCBzdGFya25ldDo6U3RvcmUpXQpwdWIgc3RydWN0IENvbW1pdG1lbnRFbnRyeSB7CiAgICBwdWIgdG9rZW46IENvbnRyYWN0QWRkcmVzcywKICAgIHB1YiBhbW91bnQ6IHUxMjgsCiAgICBwdWIgY2xhaW1lZDogYm9vbCwKfQoKLy8vIE9wZXJhdGlvbiB0byBwZXJmb3JtIG9uIHRoZSBlc2Nyb3cuCiNbZGVyaXZlKFNlcmRlLCBDb3B5LCBEcm9wLCBQYXJ0aWFsRXEsIERlYnVnKV0KcHViIGVudW0gRXNjcm93T3BlcmF0aW9uIHsKICAgIERlcG9zaXQsCiAgICBDbGFpbSwKfQoKI1tzdGFya25ldDo6aW50ZXJmYWNlXQpwdWIgdHJhaXQgSUVzY3JvdzxUPiB7CiAgICAvLy8gUmV0dXJucyB0aGUgY29tbWl0bWVudCBlbnRyeSBmb3IgYSBnaXZlbiBoYXNoLiBBbGwgZmllbGRzIGFyZSB6ZXJvIGlmIGl0IGRvZXMgbm90IGV4aXN0LgogICAgZm4gZ2V0X2NvbW1pdG1lbnQoc2VsZjogQFQsIGNvbW1pdG1lbnRfaGFzaDogZmVsdDI1MikgLT4gQ29tbWl0bWVudEVudHJ5OwoKICAgIC8vLyBDYWxsZWQgYnkgdGhlIHByaXZhY3kgY29udHJhY3QgdmlhIHRoZSBgSU5WT0tFX1NFTEVDVE9SYC4KICAgIC8vLwogICAgLy8vIERpc3BhdGNoZXMgb24gYG9wZXJhdGlvbmA6CiAgICAvLy8KICAgIC8vLyAqKkRlcG9zaXQqKiAtIFN0b3JlcyBhIGNvbW1pdG1lbnQgYmFja2VkIGJ5IHRva2VucyB0aGUgcG9vbCBhbHJlYWR5IHRyYW5zZmVycmVkIHRvIHRoaXMKICAgIC8vLyBjb250cmFjdC4gUmV0dXJucyBhbiBlbXB0eSBzcGFuICh0b2tlbnMgc3RheSBpbiBlc2Nyb3cpLgogICAgLy8vIC0gYGNvbW1pdG1lbnRfaGFzaGAgLSBgcG9zZWlkb24oRVNDUk9XX0NPTU1JVE1FTlRfVEFHLCBzZWNyZXQpYCBjb21wdXRlZCBvZmYtY2hhaW4uCiAgICAvLy8gLSBgdG9rZW5gIC0gRVJDLTIwIHRva2VuIGFkZHJlc3MuCiAgICAvLy8gLSBgYW1vdW50YCAtIFRva2VuIGFtb3VudCB0byBlc2Nyb3cuCiAgICAvLy8gLSBgc2VjcmV0YCwgYG5vdGVfaWRgIC0gaWdub3JlZC4KICAgIC8vLwogICAgLy8vICoqQ2xhaW0qKiAtIFZlcmlmaWVzIGBoYXNoKHNlY3JldClgIG1hdGNoZXMgYSBzdG9yZWQgY29tbWl0bWVudCwgbWFya3MgaXQgY2xhaW1lZCwKICAgIC8vLyBhcHByb3ZlcyB0aGUgY2FsbGVyIChwcml2YWN5IGNvbnRyYWN0KSB0byBwdWxsIHRva2VucywgYW5kIHJldHVybnMgdGhlIGRlcG9zaXQgaW5zdHJ1Y3Rpb24uCiAgICAvLy8gLSBgc2VjcmV0YCAtIFRoZSBwcmVpbWFnZSB3aG9zZSBoYXNoIG1hdGNoZXMgdGhlIHN0b3JlZCBjb21taXRtZW50LgogICAgLy8vIC0gYG5vdGVfaWRgIC0gVGhlIG9wZW4gbm90ZSBpZGVudGlmaWVyIChjb21wdXRlZCBieSB0aGUgU0RLIGFuZCBwYXNzZWQgaW4gY2FsbGRhdGEpLgogICAgLy8vIC0gYGNvbW1pdG1lbnRfaGFzaGAsIGB0b2tlbmAsIGBhbW91bnRgIC0gaWdub3JlZC4KICAgIGZuIHByaXZhY3lfaW52b2tlKAogICAgICAgIHJlZiBzZWxmOiBULAogICAgICAgIG9wZXJhdGlvbjogRXNjcm93T3BlcmF0aW9uLAogICAgICAgIGNvbW1pdG1lbnRfaGFzaDogZmVsdDI1MiwKICAgICAgICB0b2tlbjogQ29udHJhY3RBZGRyZXNzLAogICAgICAgIGFtb3VudDogdTEyOCwKICAgICAgICBzZWNyZXQ6IGZlbHQyNTIsCiAgICAgICAgbm90ZV9pZDogZmVsdDI1MiwKICAgICkgLT4gU3BhbjxPcGVuTm90ZURlcG9zaXQ+Owp9CgovLy8gRG9tYWluLXNlcGFyYXRpb24gdGFnIGZvciBlc2Nyb3cgY29tbWl0bWVudCBoYXNoZXMuCnB1YiBjb25zdCBFU0NST1dfQ09NTUlUTUVOVF9UQUc6IGZlbHQyNTIgPSAnRVNDUk9XX0NPTU1JVE1FTlRfVEFHOlYxJzsKCnB1YiBtb2QgZXJyb3JzIHsKICAgIHB1YiBjb25zdCBaRVJPX0NPTU1JVE1FTlRfSEFTSDogZmVsdDI1MiA9ICdaRVJPX0NPTU1JVE1FTlRfSEFTSCc7CiAgICBwdWIgY29uc3QgWkVST19UT0tFTjogZmVsdDI1MiA9ICdaRVJPX1RPS0VOJzsKICAgIHB1YiBjb25zdCBaRVJPX0FNT1VOVDogZmVsdDI1MiA9ICdaRVJPX0FNT1VOVCc7CiAgICBwdWIgY29uc3QgQ09NTUlUTUVOVF9FWElTVFM6IGZlbHQyNTIgPSAnQ09NTUlUTUVOVF9FWElTVFMnOwogICAgcHViIGNvbnN0IENPTU1JVE1FTlRfTk9UX0ZPVU5EOiBmZWx0MjUyID0gJ0NPTU1JVE1FTlRfTk9UX0ZPVU5EJzsKICAgIHB1YiBjb25zdCBBTFJFQURZX0NMQUlNRUQ6IGZlbHQyNTIgPSAnQUxSRUFEWV9DTEFJTUVEJzsKICAgIHB1YiBjb25zdCBDQUxMRVJfTk9UX1BSSVZBQ1k6IGZlbHQyNTIgPSAnQ0FMTEVSX05PVF9QUklWQUNZJzsKfQoKLy8vIENvbXB1dGVzIHRoZSBjb21taXRtZW50IGhhc2ggZnJvbSBhIHNlY3JldCB1c2luZyBkb21haW4tc2VwYXJhdGVkIFBvc2VpZG9uLgpwdWIgZm4gY29tcHV0ZV9jb21taXRtZW50X2hhc2goc2VjcmV0OiBmZWx0MjUyKSAtPiBmZWx0MjUyIHsKICAgIGNvcmU6OnBvc2VpZG9uOjpwb3NlaWRvbl9oYXNoX3NwYW4oW0VTQ1JPV19DT01NSVRNRU5UX1RBRywgc2VjcmV0XS5zcGFuKCkpCn0KCiNbc3RhcmtuZXQ6OmNvbnRyYWN0XQpwdWIgbW9kIEVzY3JvdyB7CiAgICB1c2UgY29yZTo6bnVtOjp0cmFpdHM6Olplcm87CiAgICB1c2Ugb3BlbnplcHBlbGluOjppbnRlcmZhY2VzOjp0b2tlbjo6ZXJjMjA6OntJRVJDMjBEaXNwYXRjaGVyLCBJRVJDMjBEaXNwYXRjaGVyVHJhaXR9OwogICAgdXNlIHByaXZhY3k6Om9iamVjdHM6Ok9wZW5Ob3RlRGVwb3NpdDsKICAgIHVzZSBzdGFya25ldDo6c3RvcmFnZTo6ewogICAgICAgIFN0b3JhZ2VNYXBSZWFkQWNjZXNzLCBTdG9yYWdlTWFwV3JpdGVBY2Nlc3MsIFN0b3JhZ2VQb2ludGVyUmVhZEFjY2VzcywKICAgICAgICBTdG9yYWdlUG9pbnRlcldyaXRlQWNjZXNzLAogICAgfTsKICAgIHVzZSBzdGFya25ldDo6e0NvbnRyYWN0QWRkcmVzcywgZ2V0X2NhbGxlcl9hZGRyZXNzfTsKICAgIHVzZSBzdXBlcjo6e0NvbW1pdG1lbnRFbnRyeSwgRXNjcm93T3BlcmF0aW9uLCBJRXNjcm93LCBjb21wdXRlX2NvbW1pdG1lbnRfaGFzaCwgZXJyb3JzfTsKCiAgICAjW3N0b3JhZ2VdCiAgICBzdHJ1Y3QgU3RvcmFnZSB7CiAgICAgICAgcHJpdmFjeV9jb250cmFjdDogQ29udHJhY3RBZGRyZXNzLAogICAgICAgIGNvbW1pdG1lbnRzOiBzdGFya25ldDo6c3RvcmFnZTo6TWFwPGZlbHQyNTIsIENvbW1pdG1lbnRFbnRyeT4sCiAgICB9CgogICAgI1tjb25zdHJ1Y3Rvcl0KICAgIGZuIGNvbnN0cnVjdG9yKHJlZiBzZWxmOiBDb250cmFjdFN0YXRlLCBwcml2YWN5X2NvbnRyYWN0OiBDb250cmFjdEFkZHJlc3MpIHsKICAgICAgICBzZWxmLnByaXZhY3lfY29udHJhY3Qud3JpdGUocHJpdmFjeV9jb250cmFjdCk7CiAgICB9CgogICAgI1thYmkoZW1iZWRfdjApXQogICAgcHViIGltcGwgRXNjcm93SW1wbCBvZiBJRXNjcm93PENvbnRyYWN0U3RhdGU+IHsKICAgICAgICBmbiBnZXRfY29tbWl0bWVudChzZWxmOiBAQ29udHJhY3RTdGF0ZSwgY29tbWl0bWVudF9oYXNoOiBmZWx0MjUyKSAtPiBDb21taXRtZW50RW50cnkgewogICAgICAgICAgICBzZWxmLmNvbW1pdG1lbnRzLnJlYWQoY29tbWl0bWVudF9oYXNoKQogICAgICAgIH0KCiAgICAgICAgZm4gcHJpdmFjeV9pbnZva2UoCiAgICAgICAgICAgIHJlZiBzZWxmOiBDb250cmFjdFN0YXRlLAogICAgICAgICAgICBvcGVyYXRpb246IEVzY3Jvd09wZXJhdGlvbiwKICAgICAgICAgICAgY29tbWl0bWVudF9oYXNoOiBmZWx0MjUyLAogICAgICAgICAgICB0b2tlbjogQ29udHJhY3RBZGRyZXNzLAogICAgICAgICAgICBhbW91bnQ6IHUxMjgsCiAgICAgICAgICAgIHNlY3JldDogZmVsdDI1MiwKICAgICAgICAgICAgbm90ZV9pZDogZmVsdDI1MiwKICAgICAgICApIC0+IFNwYW48T3Blbk5vdGVEZXBvc2l0PiB7CiAgICAgICAgICAgIGxldCBwcml2YWN5X2FkZHIgPSBzZWxmLnByaXZhY3lfY29udHJhY3QucmVhZCgpOwogICAgICAgICAgICBhc3NlcnQoZ2V0X2NhbGxlcl9hZGRyZXNzKCkgPT0gcHJpdmFjeV9hZGRyLCBlcnJvcnM6OkNBTExFUl9OT1RfUFJJVkFDWSk7CgogICAgICAgICAgICBtYXRjaCBvcGVyYXRpb24gewogICAgICAgICAgICAgICAgRXNjcm93T3BlcmF0aW9uOjpEZXBvc2l0ID0+IHsKICAgICAgICAgICAgICAgICAgICBhc3NlcnQoY29tbWl0bWVudF9oYXNoLmlzX25vbl96ZXJvKCksIGVycm9yczo6WkVST19DT01NSVRNRU5UX0hBU0gpOwogICAgICAgICAgICAgICAgICAgIGFzc2VydCh0b2tlbi5pc19ub25femVybygpLCBlcnJvcnM6OlpFUk9fVE9LRU4pOwogICAgICAgICAgICAgICAgICAgIGFzc2VydChhbW91bnQuaXNfbm9uX3plcm8oKSwgZXJyb3JzOjpaRVJPX0FNT1VOVCk7CgogICAgICAgICAgICAgICAgICAgIGxldCBleGlzdGluZyA9IHNlbGYuY29tbWl0bWVudHMucmVhZChjb21taXRtZW50X2hhc2gpOwogICAgICAgICAgICAgICAgICAgIGFzc2VydChleGlzdGluZy50b2tlbi5pc196ZXJvKCksIGVycm9yczo6Q09NTUlUTUVOVF9FWElTVFMpOwoKICAgICAgICAgICAgICAgICAgICBzZWxmCiAgICAgICAgICAgICAgICAgICAgICAgIC5jb21taXRtZW50cwogICAgICAgICAgICAgICAgICAgICAgICAud3JpdGUoCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXRtZW50X2hhc2gsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21taXRtZW50RW50cnkgeyB0b2tlbiwgYW1vdW50LCBjbGFpbWVkOiBmYWxzZSB9LAogICAgICAgICAgICAgICAgICAgICAgICApOwoKICAgICAgICAgICAgICAgICAgICAvLyBUb2tlbnMgYWxyZWFkeSB0cmFuc2ZlcnJlZCBieSB0aGUgcG9vbCB2aWEgV2l0aGRyYXcuIFJldHVybiBlbXB0eSBzcGFuLgogICAgICAgICAgICAgICAgICAgIFtdLnNwYW4oKQogICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICAgIEVzY3Jvd09wZXJhdGlvbjo6Q2xhaW0gPT4gewogICAgICAgICAgICAgICAgICAgIGxldCBjb21taXRtZW50X2hhc2ggPSBjb21wdXRlX2NvbW1pdG1lbnRfaGFzaChzZWNyZXQpOwogICAgICAgICAgICAgICAgICAgIGxldCBlbnRyeSA9IHNlbGYuY29tbWl0bWVudHMucmVhZChjb21taXRtZW50X2hhc2gpOwogICAgICAgICAgICAgICAgICAgIGFzc2VydChlbnRyeS50b2tlbi5pc19ub25femVybygpLCBlcnJvcnM6OkNPTU1JVE1FTlRfTk9UX0ZPVU5EKTsKICAgICAgICAgICAgICAgICAgICBhc3NlcnQoIWVudHJ5LmNsYWltZWQsIGVycm9yczo6QUxSRUFEWV9DTEFJTUVEKTsKCiAgICAgICAgICAgICAgICAgICAgc2VsZgogICAgICAgICAgICAgICAgICAgICAgICAuY29tbWl0bWVudHMKICAgICAgICAgICAgICAgICAgICAgICAgLndyaXRlKAogICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWl0bWVudF9oYXNoLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tbWl0bWVudEVudHJ5IHsgY2xhaW1lZDogdHJ1ZSwgLi5lbnRyeSB9LAogICAgICAgICAgICAgICAgICAgICAgICApOwoKICAgICAgICAgICAgICAgICAgICAvLyBBcHByb3ZlIHRoZSBwcml2YWN5IGNvbnRyYWN0IHRvIHB1bGwgdGhlIGVzY3Jvd2VkIHRva2Vucy4KICAgICAgICAgICAgICAgICAgICBJRVJDMjBEaXNwYXRjaGVyIHsgY29udHJhY3RfYWRkcmVzczogZW50cnkudG9rZW4gfQogICAgICAgICAgICAgICAgICAgICAgICAuYXBwcm92ZShzcGVuZGVyOiBwcml2YWN5X2FkZHIsIGFtb3VudDogZW50cnkuYW1vdW50LmludG8oKSk7CgogICAgICAgICAgICAgICAgICAgIFtPcGVuTm90ZURlcG9zaXQgeyBub3RlX2lkLCB0b2tlbjogZW50cnkudG9rZW4sIGFtb3VudDogZW50cnkuYW1vdW50IH1dLnNwYW4oKQogICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KfQo=",
  },
]

const html = `<p>The escrow helper solves a real problem: you cannot privately transfer to someone
who has not registered a viewing key yet. Instead, you <strong>escrow the funds behind a
secret</strong>, share the secret off-chain (a claim link), and the recipient claims the
funds into their own note once they are registered.</p>
<p>It is a two-operation state machine driven by <code>privacy_invoke</code>:</p>
<ul>
<li><strong>Deposit</strong> - the pool withdraws tokens to the escrow, which stores a
<code>CommitmentEntry</code> keyed by <code>poseidon(ESCROW_COMMITMENT_TAG, secret)</code>. Only the
hash goes on-chain; the secret never does.</li>
<li><strong>Claim</strong> - the claimer proves knowledge of the secret preimage. The escrow marks
the commitment claimed, approves the pool to pull the tokens, and returns an
<code>OpenNoteDeposit</code> instructing the pool to credit the claimer&#39;s open note.</li>
</ul>
<pre><code class="language-cairo"><span class="hljs-comment">// Adapted from starknet-privacy packages/escrow/src/escrow.cairo (Apache-2.0, StarkWare)</span>
<span class="hljs-keyword">use</span> privacy::objects::OpenNoteDeposit;
<span class="hljs-keyword">use</span> starknet::ContractAddress;

<span class="hljs-comment">/// Entry stored per commitment in the escrow.</span>
<span class="hljs-meta">#[derive(Serde, Copy, Drop, PartialEq, Debug, starknet::Store)]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">struct</span> <span class="hljs-title class_">CommitmentEntry</span> {
    <span class="hljs-keyword">pub</span> token: ContractAddress,
    <span class="hljs-keyword">pub</span> amount: <span class="hljs-type">u128</span>,
    <span class="hljs-keyword">pub</span> claimed: <span class="hljs-type">bool</span>,
}

<span class="hljs-comment">/// Operation to perform on the escrow.</span>
<span class="hljs-meta">#[derive(Serde, Copy, Drop, PartialEq, Debug)]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">enum</span> <span class="hljs-title class_">EscrowOperation</span> {
    Deposit,
    Claim,
}

<span class="hljs-meta">#[starknet::interface]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">trait</span> <span class="hljs-title class_">IEscrow</span>&lt;T&gt; {
    <span class="hljs-comment">/// Returns the commitment entry for a given hash. All fields are zero if it does not exist.</span>
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">get_commitment</span>(<span class="hljs-keyword">self</span>: @T, commitment_hash: felt252) <span class="hljs-punctuation">-&gt;</span> CommitmentEntry;

    <span class="hljs-comment">/// Called by the privacy contract via the \`INVOKE_SELECTOR\`.</span>
    <span class="hljs-comment">///</span>
    <span class="hljs-comment">/// Dispatches on \`operation\`:</span>
    <span class="hljs-comment">///</span>
    <span class="hljs-comment">/// **Deposit** - Stores a commitment backed by tokens the pool already transferred to this</span>
    <span class="hljs-comment">/// contract. Returns an empty span (tokens stay in escrow).</span>
    <span class="hljs-comment">/// - \`commitment_hash\` - \`poseidon(ESCROW_COMMITMENT_TAG, secret)\` computed off-chain.</span>
    <span class="hljs-comment">/// - \`token\` - ERC-20 token address.</span>
    <span class="hljs-comment">/// - \`amount\` - Token amount to escrow.</span>
    <span class="hljs-comment">/// - \`secret\`, \`note_id\` - ignored.</span>
    <span class="hljs-comment">///</span>
    <span class="hljs-comment">/// **Claim** - Verifies \`hash(secret)\` matches a stored commitment, marks it claimed,</span>
    <span class="hljs-comment">/// approves the caller (privacy contract) to pull tokens, and returns the deposit instruction.</span>
    <span class="hljs-comment">/// - \`secret\` - The preimage whose hash matches the stored commitment.</span>
    <span class="hljs-comment">/// - \`note_id\` - The open note identifier (computed by the SDK and passed in calldata).</span>
    <span class="hljs-comment">/// - \`commitment_hash\`, \`token\`, \`amount\` - ignored.</span>
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">privacy_invoke</span>(
        <span class="hljs-keyword">ref</span> <span class="hljs-keyword">self</span>: T,
        operation: EscrowOperation,
        commitment_hash: felt252,
        token: ContractAddress,
        amount: <span class="hljs-type">u128</span>,
        secret: felt252,
        note_id: felt252,
    ) <span class="hljs-punctuation">-&gt;</span> Span&lt;OpenNoteDeposit&gt;;
}

<span class="hljs-comment">/// Domain-separation tag for escrow commitment hashes.</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">const</span> ESCROW_COMMITMENT_TAG: felt252 = <span class="hljs-symbol">&#x27;ESCROW_COMMITMENT_TAG</span>:V1<span class="hljs-string">&#x27;;

pub mod errors {
    pub const ZERO_COMMITMENT_HASH: felt252 = &#x27;</span>ZERO_COMMITMENT_HASH<span class="hljs-string">&#x27;;
    pub const ZERO_TOKEN: felt252 = &#x27;</span>ZERO_TOKEN<span class="hljs-string">&#x27;;
    pub const ZERO_AMOUNT: felt252 = &#x27;</span>ZERO_AMOUNT<span class="hljs-string">&#x27;;
    pub const COMMITMENT_EXISTS: felt252 = &#x27;</span>COMMITMENT_EXISTS<span class="hljs-string">&#x27;;
    pub const COMMITMENT_NOT_FOUND: felt252 = &#x27;</span>COMMITMENT_NOT_FOUND<span class="hljs-string">&#x27;;
    pub const ALREADY_CLAIMED: felt252 = &#x27;</span>ALREADY_CLAIMED<span class="hljs-string">&#x27;;
    pub const CALLER_NOT_PRIVACY: felt252 = &#x27;</span>CALLER_NOT_PRIVACY<span class="hljs-string">&#x27;;
}

/// Computes the commitment hash from a secret using domain-separated Poseidon.
pub fn compute_commitment_hash(secret: felt252) -&gt; felt252 {
    core::poseidon::poseidon_hash_span([ESCROW_COMMITMENT_TAG, secret].span())
}

#[starknet::contract]
pub mod Escrow {
    use core::num::traits::Zero;
    use openzeppelin::interfaces::token::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};
    use privacy::objects::OpenNoteDeposit;
    use starknet::storage::{
        StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_caller_address};
    use super::{CommitmentEntry, EscrowOperation, IEscrow, compute_commitment_hash, errors};

    #[storage]
    struct Storage {
        privacy_contract: ContractAddress,
        commitments: starknet::storage::Map&lt;felt252, CommitmentEntry&gt;,
    }

    #[constructor]
    fn constructor(ref self: ContractState, privacy_contract: ContractAddress) {
        self.privacy_contract.write(privacy_contract);
    }

    #[abi(embed_v0)]
    pub impl EscrowImpl of IEscrow&lt;ContractState&gt; {
        fn get_commitment(self: @ContractState, commitment_hash: felt252) -&gt; CommitmentEntry {
            self.commitments.read(commitment_hash)
        }

        fn privacy_invoke(
            ref self: ContractState,
            operation: EscrowOperation,
            commitment_hash: felt252,
            token: ContractAddress,
            amount: u128,
            secret: felt252,
            note_id: felt252,
        ) -&gt; Span&lt;OpenNoteDeposit&gt; {
            let privacy_addr = self.privacy_contract.read();
            assert(get_caller_address() == privacy_addr, errors::CALLER_NOT_PRIVACY);

            match operation {
                EscrowOperation::Deposit =&gt; {
                    assert(commitment_hash.is_non_zero(), errors::ZERO_COMMITMENT_HASH);
                    assert(token.is_non_zero(), errors::ZERO_TOKEN);
                    assert(amount.is_non_zero(), errors::ZERO_AMOUNT);

                    let existing = self.commitments.read(commitment_hash);
                    assert(existing.token.is_zero(), errors::COMMITMENT_EXISTS);

                    self
                        .commitments
                        .write(
                            commitment_hash,
                            CommitmentEntry { token, amount, claimed: false },
                        );

                    // Tokens already transferred by the pool via Withdraw. Return empty span.
                    [].span()
                },
                EscrowOperation::Claim =&gt; {
                    let commitment_hash = compute_commitment_hash(secret);
                    let entry = self.commitments.read(commitment_hash);
                    assert(entry.token.is_non_zero(), errors::COMMITMENT_NOT_FOUND);
                    assert(!entry.claimed, errors::ALREADY_CLAIMED);

                    self
                        .commitments
                        .write(
                            commitment_hash,
                            CommitmentEntry { claimed: true, ..entry },
                        );

                    // Approve the privacy contract to pull the escrowed tokens.
                    IERC20Dispatcher { contract_address: entry.token }
                        .approve(spender: privacy_addr, amount: entry.amount.into());

                    [OpenNoteDeposit { note_id, token: entry.token, amount: entry.amount }].span()
                },
            }
        }
    }
}
</span>
</code></pre><h2 id="things-to-notice">Things to notice<a class="anchor" href="#things-to-notice" aria-label="Link to this section">#</a></h2>
<ul>
<li><strong>Access control</strong> - <code>privacy_invoke</code> asserts the caller is the privacy pool.
Nobody can drive the escrow directly.</li>
<li><strong>Commitment hash is domain-separated</strong> - <code>ESCROW_COMMITMENT_TAG</code> prevents the
secret&#39;s hash from colliding with hashes used elsewhere.</li>
<li><strong>Deposit returns an empty span</strong> - tokens stay parked in the escrow, so there is
nothing for the pool to credit yet.</li>
<li><strong>Claim recomputes the hash from the secret</strong> - the passed-in <code>commitment_hash</code>
parameter is ignored on claim; only the preimage matters.</li>
<li><strong>Double-claim protection</strong> - the <code>claimed</code> flag flips exactly once; a second
claim hits <code>ALREADY_CLAIMED</code>.</li>
</ul>
<p>The SDK pairs with this contract through <code>computeCommitmentHash</code>,
<code>generateEscrowSecret</code>, <code>buildDepositInvoke</code>, <code>buildClaimInvoke</code> and
<code>buildClaimUrl</code> - see <a href="/sdk/getting-started">Build Privacy Wallets</a> for the TypeScript side of this flow.</p>
`

export default html
