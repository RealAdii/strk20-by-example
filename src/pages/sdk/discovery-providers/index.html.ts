// metadata
export const version = "0.14.3"
export const title = "Discovery Providers"
export const description =
  "Choose between IndexerDiscoveryProvider and ContractDiscoveryProvider"
export const githubLink =
  "https://github.com/starkware-libs/starknet-privacy/blob/main/sdk/README.md"
export const githubLabel = ""

export const keywords = [
  "discovery",
  "indexer",
  "contract",
  "provider",
  "rate limit",
  "deep import",
]

export const codes = []

// Raw markdown source, for "View as Markdown" / "Copy for LLM".
export const markdown = `
Everything on the previous page - \`discoverNotes\`, \`discoverChannels\`,
\`discoverRequirement\`, the \`autoDiscover\` options - is served by the
\`discoveryProvider\` you wired into \`createPrivateTransfers\`. The SDK ships
two implementations.

| Provider                    | Backend                        | Use for                                                         |
| --------------------------- | ------------------------------ | --------------------------------------------------------------- |
| \`IndexerDiscoveryProvider\`  | Discovery service over HTTP    | Production - pagination and reorg detection handled server-side |
| \`ContractDiscoveryProvider\` | Pool contract via Starknet RPC | Development, testing, no-extra-infra setups                     |

## IndexerDiscoveryProvider

\`\`\`typescript
// Deep import - the package-root export's TypeScript declaration does not
// currently satisfy DiscoveryProviderInterface at v0.14.2.
// @ts-expect-error
import { IndexerDiscoveryProvider } from "@starkware-libs/starknet-privacy-sdk/dist/internal/indexer-discovery.js"

const discoveryProvider = new IndexerDiscoveryProvider(
  process.env.INDEXER_URL!,
  process.env.POOL_ADDRESS!, // hex string, like everywhere else
)
\`\`\`

The deep import is a temporary workaround, not a style choice: importing
from the package root type-errors even though it works at runtime. When the
SDK ships type-clean exports, drop the deep path and the \`@ts-expect-error\`
in the same change.

## ContractDiscoveryProvider

\`\`\`typescript
import { ContractDiscoveryProvider } from "@starkware-libs/starknet-privacy-sdk"

const discoveryProvider = new ContractDiscoveryProvider(poolContract, {
  rateLimit: { maxConcurrent: 4, minDelay: 100 },
})
\`\`\`

It replays pool events by querying the contract directly - every scan is a
burst of RPC calls. The \`rateLimit\` option (max concurrent requests plus a
minimum delay between them) keeps you under public-RPC rate limits; without
it, a full scan against a free endpoint gets you HTTP 429s mid-discovery.

## Things to notice

- Both satisfy the same \`DiscoveryProviderInterface\` - swap them behind an
  environment variable and no other code changes.
- Contract-based discovery cost grows with pool history. Fine on a devnet or
  a young Sepolia deployment; painful on a busy pool. The indexer does the
  scanning once, server-side.
- Reorg handling: the indexer detects L2 reorgs and repairs its cursor. With
  the contract provider you inherit whatever your RPC node reports - one
  more reason it is the development option.
- Cursors are provider-specific opaque values. Do not persist a cursor from
  one provider and feed it to the other.

Next: [Proving Configuration](/sdk/proving-config) - the proving side of the
same wiring.
`

const html = `<p>Everything on the previous page - <code>discoverNotes</code>, <code>discoverChannels</code>,
<code>discoverRequirement</code>, the <code>autoDiscover</code> options - is served by the
<code>discoveryProvider</code> you wired into <code>createPrivateTransfers</code>. The SDK ships
two implementations.</p>
<table>
<thead>
<tr>
<th>Provider</th>
<th>Backend</th>
<th>Use for</th>
</tr>
</thead>
<tbody><tr>
<td><code>IndexerDiscoveryProvider</code></td>
<td>Discovery service over HTTP</td>
<td>Production - pagination and reorg detection handled server-side</td>
</tr>
<tr>
<td><code>ContractDiscoveryProvider</code></td>
<td>Pool contract via Starknet RPC</td>
<td>Development, testing, no-extra-infra setups</td>
</tr>
</tbody></table>
<h2 id="indexerdiscoveryprovider">IndexerDiscoveryProvider<a class="anchor" href="#indexerdiscoveryprovider" aria-label="Link to this section">#</a></h2>
<pre><code class="language-typescript"><span class="hljs-comment">// Deep import - the package-root export&#x27;s TypeScript declaration does not</span>
<span class="hljs-comment">// currently satisfy DiscoveryProviderInterface at v0.14.2.</span>
<span class="hljs-comment">// @ts-expect-error</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexerDiscoveryProvider</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"@starkware-libs/starknet-privacy-sdk/dist/internal/indexer-discovery.js"</span>

<span class="hljs-keyword">const</span> discoveryProvider = <span class="hljs-keyword">new</span> <span class="hljs-title class_">IndexerDiscoveryProvider</span>(
  process.<span class="hljs-property">env</span>.<span class="hljs-property">INDEXER_URL</span>!,
  process.<span class="hljs-property">env</span>.<span class="hljs-property">POOL_ADDRESS</span>!, <span class="hljs-comment">// hex string, like everywhere else</span>
)
</code></pre><p>The deep import is a temporary workaround, not a style choice: importing
from the package root type-errors even though it works at runtime. When the
SDK ships type-clean exports, drop the deep path and the <code>@ts-expect-error</code>
in the same change.</p>
<h2 id="contractdiscoveryprovider">ContractDiscoveryProvider<a class="anchor" href="#contractdiscoveryprovider" aria-label="Link to this section">#</a></h2>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ContractDiscoveryProvider</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">"@starkware-libs/starknet-privacy-sdk"</span>

<span class="hljs-keyword">const</span> discoveryProvider = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ContractDiscoveryProvider</span>(poolContract, {
  <span class="hljs-attr">rateLimit</span>: { <span class="hljs-attr">maxConcurrent</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">minDelay</span>: <span class="hljs-number">100</span> },
})
</code></pre><p>It replays pool events by querying the contract directly - every scan is a
burst of RPC calls. The <code>rateLimit</code> option (max concurrent requests plus a
minimum delay between them) keeps you under public-RPC rate limits; without
it, a full scan against a free endpoint gets you HTTP 429s mid-discovery.</p>
<h2 id="things-to-notice">Things to notice<a class="anchor" href="#things-to-notice" aria-label="Link to this section">#</a></h2>
<ul>
<li>Both satisfy the same <code>DiscoveryProviderInterface</code> - swap them behind an
environment variable and no other code changes.</li>
<li>Contract-based discovery cost grows with pool history. Fine on a devnet or
a young Sepolia deployment; painful on a busy pool. The indexer does the
scanning once, server-side.</li>
<li>Reorg handling: the indexer detects L2 reorgs and repairs its cursor. With
the contract provider you inherit whatever your RPC node reports - one
more reason it is the development option.</li>
<li>Cursors are provider-specific opaque values. Do not persist a cursor from
one provider and feed it to the other.</li>
</ul>
<p>Next: <a href="/sdk/proving-config">Proving Configuration</a> - the proving side of the
same wiring.</p>
`

export default html
