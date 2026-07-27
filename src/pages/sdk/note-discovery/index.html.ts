// metadata
export const version = "0.14.3"
export const title = "Discovering Notes"
export const description =
  "Scan your channels for unspent notes with discoverNotes and discoverChannels"
export const githubLink =
  "https://github.com/starkware-libs/starknet-privacy/blob/main/sdk/README.md"
export const githubLabel = ""

export const keywords = [
  "discovery",
  "notes",
  "cursor",
  "AddressMap",
  "registry",
  "channels",
]

export const codes = []

// Raw markdown source, for "View as Markdown" / "Copy for LLM".
export const markdown = `
Discovery scans your channels and decrypts the notes addressed to you. It is
a **query, not a transaction** - no proof, no fee, no submission. Use it to
show the user's private balance and to feed \`.inputs(...)\`.

Snippets assume \`transfers\`, \`account\` and \`provider\` from
[Getting Started](/sdk/getting-started).

\`\`\`typescript
const { notes, timestamp } = await transfers.discoverNotes({
  tokens: [BigInt(tokenAddress)], // token filter entries MUST be bigint
})

// notes: AddressMap<Note[]> keyed by BIGINT token address
const tokenNotes = notes.get(BigInt(tokenAddress)) ?? []
const balance = tokenNotes.reduce((sum, note) => sum + note.amount, 0n)
\`\`\`

## \`AddressMap\`

The result map normalizes address keys - but as **bigints**, not strings:

\`\`\`typescript
notes.get(tokenAddress) // undefined - string key never matches
notes.get(tokenAddress.toLowerCase()) // still undefined
notes.get(BigInt(tokenAddress)) // works

// Iterating across all tokens is always safe:
for (const tokenNotes of notes.values()) {
  // ...
}
\`\`\`

## Incremental scans with a cursor

Discovery without a cursor scans from the beginning. Persist the cursor from
the underlying provider (or better: reuse the \`registry\`) so repeat scans
only cover new blocks:

\`\`\`typescript
const { notes } = await transfers.discoverNotes({
  tokens: [BigInt(tokenAddress)],
  cursor: previousCursor, // resume where the last scan stopped
})
\`\`\`

The higher-level version of the same idea is the **registry**: every
\`execute()\` returns an updated \`PrivateRegistry\` (channels + notes + cursor).
Pass it back into the next \`build({ registry })\` and combine with
\`autoDiscover: { notes: "missing" }\` to fetch only what the registry lacks -
\`"refresh"\` re-scans, \`"all"\` rebuilds from scratch.

## Discovering channels

\`\`\`typescript
const { channels, total } = await transfers.discoverChannels("all", {
  cursor: previousChannelCursor,
})
// channels: AddressMap<Channel> keyed by recipient address
\`\`\`

Pass \`"all"\` or a list of recipient addresses to filter. Channels hold the
shared key and per-token nonces; you mostly treat them as opaque values that
the registry manages for you.

## Things to notice

- A note becomes visible to discovery once its transaction is accepted, but
  it is only **spendable 10 blocks after creation**. Check \`note.created\`
  against the current block before offering it as an input.
- Discovery cost scales with unscanned history - a fresh full scan on a
  long-lived pool is slow on RPC-based providers. Cursors and the registry
  exist precisely to avoid it.

Next: [Discovery Providers](/sdk/discovery-providers) - choosing what backs
these scans.
`

const html = `<p>Discovery scans your channels and decrypts the notes addressed to you. It is
a <strong>query, not a transaction</strong> - no proof, no fee, no submission. Use it to
show the user&#39;s private balance and to feed <code>.inputs(...)</code>.</p>
<p>Snippets assume <code>transfers</code>, <code>account</code> and <code>provider</code> from
<a href="/sdk/getting-started">Getting Started</a>.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> { notes, timestamp } = <span class="hljs-keyword">await</span> transfers.<span class="hljs-title function_">discoverNotes</span>({
  <span class="hljs-attr">tokens</span>: [<span class="hljs-title class_">BigInt</span>(tokenAddress)], <span class="hljs-comment">// token filter entries MUST be bigint</span>
})

<span class="hljs-comment">// notes: AddressMap&lt;Note[]&gt; keyed by BIGINT token address</span>
<span class="hljs-keyword">const</span> tokenNotes = notes.<span class="hljs-title function_">get</span>(<span class="hljs-title class_">BigInt</span>(tokenAddress)) ?? []
<span class="hljs-keyword">const</span> balance = tokenNotes.<span class="hljs-title function_">reduce</span>(<span class="hljs-function">(<span class="hljs-params">sum, note</span>) =&gt;</span> sum + note.<span class="hljs-property">amount</span>, <span class="hljs-number">0n</span>)
</code></pre><h2 id="addressmap"><code>AddressMap</code><a class="anchor" href="#addressmap" aria-label="Link to this section">#</a></h2>
<p>The result map normalizes address keys - but as <strong>bigints</strong>, not strings:</p>
<pre><code class="language-typescript">notes.<span class="hljs-title function_">get</span>(tokenAddress) <span class="hljs-comment">// undefined - string key never matches</span>
notes.<span class="hljs-title function_">get</span>(tokenAddress.<span class="hljs-title function_">toLowerCase</span>()) <span class="hljs-comment">// still undefined</span>
notes.<span class="hljs-title function_">get</span>(<span class="hljs-title class_">BigInt</span>(tokenAddress)) <span class="hljs-comment">// works</span>

<span class="hljs-comment">// Iterating across all tokens is always safe:</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> tokenNotes <span class="hljs-keyword">of</span> notes.<span class="hljs-title function_">values</span>()) {
  <span class="hljs-comment">// ...</span>
}
</code></pre><h2 id="incremental-scans-with-a-cursor">Incremental scans with a cursor<a class="anchor" href="#incremental-scans-with-a-cursor" aria-label="Link to this section">#</a></h2>
<p>Discovery without a cursor scans from the beginning. Persist the cursor from
the underlying provider (or better: reuse the <code>registry</code>) so repeat scans
only cover new blocks:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> { notes } = <span class="hljs-keyword">await</span> transfers.<span class="hljs-title function_">discoverNotes</span>({
  <span class="hljs-attr">tokens</span>: [<span class="hljs-title class_">BigInt</span>(tokenAddress)],
  <span class="hljs-attr">cursor</span>: previousCursor, <span class="hljs-comment">// resume where the last scan stopped</span>
})
</code></pre><p>The higher-level version of the same idea is the <strong>registry</strong>: every
<code>execute()</code> returns an updated <code>PrivateRegistry</code> (channels + notes + cursor).
Pass it back into the next <code>build({ registry })</code> and combine with
<code>autoDiscover: { notes: "missing" }</code> to fetch only what the registry lacks -
<code>"refresh"</code> re-scans, <code>"all"</code> rebuilds from scratch.</p>
<h2 id="discovering-channels">Discovering channels<a class="anchor" href="#discovering-channels" aria-label="Link to this section">#</a></h2>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> { channels, total } = <span class="hljs-keyword">await</span> transfers.<span class="hljs-title function_">discoverChannels</span>(<span class="hljs-string">"all"</span>, {
  <span class="hljs-attr">cursor</span>: previousChannelCursor,
})
<span class="hljs-comment">// channels: AddressMap&lt;Channel&gt; keyed by recipient address</span>
</code></pre><p>Pass <code>"all"</code> or a list of recipient addresses to filter. Channels hold the
shared key and per-token nonces; you mostly treat them as opaque values that
the registry manages for you.</p>
<h2 id="things-to-notice">Things to notice<a class="anchor" href="#things-to-notice" aria-label="Link to this section">#</a></h2>
<ul>
<li>A note becomes visible to discovery once its transaction is accepted, but
it is only <strong>spendable 10 blocks after creation</strong>. Check <code>note.created</code>
against the current block before offering it as an input.</li>
<li>Discovery cost scales with unscanned history - a fresh full scan on a
long-lived pool is slow on RPC-based providers. Cursors and the registry
exist precisely to avoid it.</li>
</ul>
<p>Next: <a href="/sdk/discovery-providers">Discovery Providers</a> - choosing what backs
these scans.</p>
`

export default html
