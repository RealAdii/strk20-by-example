// metadata
export const version = "0.14.3"
export const title = "Channels & Setup Requirements"
export const description =
  "Check what setup a recipient needs with discoverRequirement and open channels explicitly"
export const githubLink =
  "https://github.com/starkware-libs/starknet-privacy/blob/main/sdk/README.md"
export const githubLabel = ""

export const keywords = [
  "channels",
  "subchannel",
  "setup",
  "discoverRequirement",
  "SetupRequirement",
  "autoSetup",
]

export const codes = []

// Raw markdown source, for "View as Markdown" / "Copy for LLM".
export const markdown = `
Notes travel over **channels**. Before you can transfer token X to Bob, three
things must exist: Bob's registration, a channel from you to Bob, and a
subchannel for token X inside that channel. \`discoverRequirement\` tells you
which of these is still missing.

Snippets assume \`transfers\`, \`account\` and \`provider\` from
[Getting Started](/sdk/getting-started).

\`\`\`typescript
import { SetupRequirement } from "@starkware-libs/starknet-privacy-sdk"

// recipient is a hex string; token must be a bigint.
const requirement = await transfers.discoverRequirement(bob, BigInt(tokenAddress))
\`\`\`

| \`SetupRequirement\` | Meaning                                          | Fix                                            |
| ------------------ | ------------------------------------------------ | ---------------------------------------------- |
| \`Register\`         | Recipient has no viewing key on-chain            | They must register - you cannot do it for them |
| \`SetupChannel\`     | No channel from you to the recipient             | \`builder.setup(recipient)\`                     |
| \`SetupToken\`       | Channel exists, this token's subchannel does not | \`t.setup(recipient)\`                           |
| \`Ready\`            | Transfer will go through                         | Nothing                                        |

## Opening channels explicitly

\`setup()\` on the **main builder** opens the channel; \`setup()\` on the
**token builder** opens the token subchannel. Bundle them with the transfer
they unblock:

\`\`\`typescript
const provingBlockId = (await provider.getBlockNumber()) - 10
const builder = transfers.build({ autoDiscover: { notes: "refresh" } })
builder.surplusTo(account.address)

if (requirement === SetupRequirement.SetupChannel) {
  builder.setup(bob) // channel
  builder.with(tokenAddress, (t) => t.setup(bob)) // + token subchannel
} else if (requirement === SetupRequirement.SetupToken) {
  builder.with(tokenAddress, (t) => t.setup(bob)) // subchannel only
}

builder.with(tokenAddress, (t) => t.transfer({ recipient: bob, amount: 50n }))
const { callAndProof } = await builder.execute({ provingBlockId })
// ... submission tail as usual
\`\`\`

## \`autoSetup\`

\`build({ autoSetup: true })\` adds the missing setup actions automatically -
convenient for single-recipient flows. For batches, prefer the explicit
pattern above: \`autoSetup\` decides from the **local registry**, and stale
registry data makes it re-open already-open channels, which fails on-chain.

## Things to notice

- **The caller must be registered** before calling \`discoverRequirement\` -
  it derives your channel keys from your on-chain viewing key. If you are
  not registered it throws, with an unhelpful message; match on
  \`"not registered"\` / \`"viewing key"\` substrings to distinguish it from
  RPC errors.
- \`SetupRequirement.Register\` is a hard stop: only the recipient can publish
  their own viewing key. Show "ask them to register" UX.
- Opening a channel is a proved pool action like any other - it rides the
  same build/execute/submit cycle, alone or alongside transfers.

Next: [Discovering Notes](/sdk/note-discovery) - reading your private balance.
`

const html = `<p>Notes travel over <strong>channels</strong>. Before you can transfer token X to Bob, three
things must exist: Bob&#39;s registration, a channel from you to Bob, and a
subchannel for token X inside that channel. <code>discoverRequirement</code> tells you
which of these is still missing.</p>
<p>Snippets assume <code>transfers</code>, <code>account</code> and <code>provider</code> from
<a href="/sdk/getting-started">Getting Started</a>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">SetupRequirement</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"@starkware-libs/starknet-privacy-sdk"</span>

<span class="hljs-comment">// recipient is a hex string; token must be a bigint.</span>
<span class="hljs-keyword">const</span> requirement = <span class="hljs-keyword">await</span> transfers.<span class="hljs-title function_">discoverRequirement</span>(bob, <span class="hljs-title class_">BigInt</span>(tokenAddress))
</code></pre><table>
<thead>
<tr>
<th><code>SetupRequirement</code></th>
<th>Meaning</th>
<th>Fix</th>
</tr>
</thead>
<tbody><tr>
<td><code>Register</code></td>
<td>Recipient has no viewing key on-chain</td>
<td>They must register - you cannot do it for them</td>
</tr>
<tr>
<td><code>SetupChannel</code></td>
<td>No channel from you to the recipient</td>
<td><code>builder.setup(recipient)</code></td>
</tr>
<tr>
<td><code>SetupToken</code></td>
<td>Channel exists, this token&#39;s subchannel does not</td>
<td><code>t.setup(recipient)</code></td>
</tr>
<tr>
<td><code>Ready</code></td>
<td>Transfer will go through</td>
<td>Nothing</td>
</tr>
</tbody></table>
<h2 id="opening-channels-explicitly">Opening channels explicitly<a class="anchor" href="#opening-channels-explicitly" aria-label="Link to this section">#</a></h2>
<p><code>setup()</code> on the <strong>main builder</strong> opens the channel; <code>setup()</code> on the
<strong>token builder</strong> opens the token subchannel. Bundle them with the transfer
they unblock:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> provingBlockId = (<span class="hljs-keyword">await</span> provider.<span class="hljs-title function_">getBlockNumber</span>()) - <span class="hljs-number">10</span>
<span class="hljs-keyword">const</span> builder = transfers.<span class="hljs-title function_">build</span>({ <span class="hljs-attr">autoDiscover</span>: { <span class="hljs-attr">notes</span>: <span class="hljs-string">"refresh"</span> } })
builder.<span class="hljs-title function_">surplusTo</span>(account.<span class="hljs-property">address</span>)

<span class="hljs-keyword">if</span> (requirement === <span class="hljs-title class_">SetupRequirement</span>.<span class="hljs-property">SetupChannel</span>) {
  builder.<span class="hljs-title function_">setup</span>(bob) <span class="hljs-comment">// channel</span>
  builder.<span class="hljs-title function_">with</span>(tokenAddress, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-title function_">setup</span>(bob)) <span class="hljs-comment">// + token subchannel</span>
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (requirement === <span class="hljs-title class_">SetupRequirement</span>.<span class="hljs-property">SetupToken</span>) {
  builder.<span class="hljs-title function_">with</span>(tokenAddress, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-title function_">setup</span>(bob)) <span class="hljs-comment">// subchannel only</span>
}

builder.<span class="hljs-title function_">with</span>(tokenAddress, <span class="hljs-function">(<span class="hljs-params">t</span>) =&gt;</span> t.<span class="hljs-title function_">transfer</span>({ <span class="hljs-attr">recipient</span>: bob, <span class="hljs-attr">amount</span>: <span class="hljs-number">50n</span> }))
<span class="hljs-keyword">const</span> { callAndProof } = <span class="hljs-keyword">await</span> builder.<span class="hljs-title function_">execute</span>({ provingBlockId })
<span class="hljs-comment">// ... submission tail as usual</span>
</code></pre><h2 id="autosetup"><code>autoSetup</code><a class="anchor" href="#autosetup" aria-label="Link to this section">#</a></h2>
<p><code>build({ autoSetup: true })</code> adds the missing setup actions automatically -
convenient for single-recipient flows. For batches, prefer the explicit
pattern above: <code>autoSetup</code> decides from the <strong>local registry</strong>, and stale
registry data makes it re-open already-open channels, which fails on-chain.</p>
<h2 id="things-to-notice">Things to notice<a class="anchor" href="#things-to-notice" aria-label="Link to this section">#</a></h2>
<ul>
<li><strong>The caller must be registered</strong> before calling <code>discoverRequirement</code> -
it derives your channel keys from your on-chain viewing key. If you are
not registered it throws, with an unhelpful message; match on
<code>"not registered"</code> / <code>"viewing key"</code> substrings to distinguish it from
RPC errors.</li>
<li><code>SetupRequirement.Register</code> is a hard stop: only the recipient can publish
their own viewing key. Show "ask them to register" UX.</li>
<li>Opening a channel is a proved pool action like any other - it rides the
same build/execute/submit cycle, alone or alongside transfers.</li>
</ul>
<p>Next: <a href="/sdk/note-discovery">Discovering Notes</a> - reading your private balance.</p>
`

export default html
