// metadata
export const version = "0.14.3"
export const title = "Introduction"
export const description =
  "Learn Starknet Privacy (STRK20) with simple, runnable examples covering private transfers on a public chain, Cairo anonymizer contracts, and wallet-builder SDK flows"
export const githubLink = ""
export const githubLabel = ""

export const keywords = [
  "introduction",
  "strk20",
  "starknet privacy",
  "by example",
  "getting started",
  "overview",
]

export const codes = []

// Raw markdown source, for "View as Markdown" / "Copy for LLM".
export const markdown = `
STRK20 brings shielded balances, private transfers, and private DeFi to any
ERC-20 on Starknet. This site teaches it the way
[Solidity by Example](https://solidity-by-example.org) teaches Solidity: one
small, focused page per idea, each with the code you would actually write.

Every snippet here is drawn from the
[starknet-privacy](https://github.com/starkware-libs/starknet-privacy)
repository, so what you read matches what ships.

## What you'll find here

- **Concepts:** the model underneath everything. Notes and nullifiers, viewing
  keys, channels, proofs, and how disclosure works. Read these once and the
  rest of the site stops being surprising.
- **Get started: build private applications:** the two routes for app
  developers. Cairo anonymizer contracts for private DeFi, and the Starknet
  Wallet API for private dapps through \`starknet.js\`.
- **Build privacy wallets:** the low-level SDK, for wallets and backends that
  need direct control over registration, note discovery, and proving.

## Where to start

Pick the row that matches what you're building:

| If you want to                          | Start at                                             |
| --------------------------------------- | ---------------------------------------------------- |
| Understand what STRK20 actually is      | [What is STRK20?](/what-is-strk20)                   |
| Choose an integration route             | [Builder Privacy Overview](/overview)                |
| Add private DeFi to an app              | [Anonymizer Contracts](/helpers/privacy-invoke)      |
| Build a private dapp with \`starknet.js\` | [Starknet Wallet API](/starknet-wallet-api/overview) |
| Build a privacy wallet                  | [Getting Started with the SDK](/sdk/getting-started) |

If you are only here for one thing, read
[Notes & Nullifiers](/notes-and-nullifiers). Nearly every other page assumes
it.

## What stays private, and what doesn't

This matters enough to say on the first page. Inside the pool, the sender,
receiver, token, amount, and which notes were spent are all private. Deposits
and withdrawals are public ERC-20 legs, and so is the timing of your
interactions. Privacy here is real but bounded, and
[Compliance & Auditing](/compliance) covers the disclosure path for when you
need to prove something to a regulator.

## Conventions on this site

- Pages are ordered as a reading path. The **Previous / Next** links at the
  bottom of each page follow it.
- Code blocks are copyable, and every page can be taken away as Markdown or
  handed to an assistant with the actions under its title.
- \`typescript\` snippets are SDK-level; \`cairo\` snippets are contract-level.
`

const html = `<p>STRK20 brings shielded balances, private transfers, and private DeFi to any
ERC-20 on Starknet. This site teaches it the way
<a href="https://solidity-by-example.org">Solidity by Example</a> teaches Solidity: one
small, focused page per idea, each with the code you would actually write.</p>
<p>Every snippet here is drawn from the
<a href="https://github.com/starkware-libs/starknet-privacy">starknet-privacy</a>
repository, so what you read matches what ships.</p>
<h2 id="what-you39ll-find-here">What you&#39;ll find here<a class="anchor" href="#what-you39ll-find-here" aria-label="Link to this section">#</a></h2>
<ul>
<li><strong>Concepts:</strong> the model underneath everything. Notes and nullifiers, viewing
keys, channels, proofs, and how disclosure works. Read these once and the
rest of the site stops being surprising.</li>
<li><strong>Get started: build private applications:</strong> the two routes for app
developers. Cairo anonymizer contracts for private DeFi, and the Starknet
Wallet API for private dapps through <code>starknet.js</code>.</li>
<li><strong>Build privacy wallets:</strong> the low-level SDK, for wallets and backends that
need direct control over registration, note discovery, and proving.</li>
</ul>
<h2 id="where-to-start">Where to start<a class="anchor" href="#where-to-start" aria-label="Link to this section">#</a></h2>
<p>Pick the row that matches what you&#39;re building:</p>
<table>
<thead>
<tr>
<th>If you want to</th>
<th>Start at</th>
</tr>
</thead>
<tbody><tr>
<td>Understand what STRK20 actually is</td>
<td><a href="/what-is-strk20">What is STRK20?</a></td>
</tr>
<tr>
<td>Choose an integration route</td>
<td><a href="/overview">Builder Privacy Overview</a></td>
</tr>
<tr>
<td>Add private DeFi to an app</td>
<td><a href="/helpers/privacy-invoke">Anonymizer Contracts</a></td>
</tr>
<tr>
<td>Build a private dapp with <code>starknet.js</code></td>
<td><a href="/starknet-wallet-api/overview">Starknet Wallet API</a></td>
</tr>
<tr>
<td>Build a privacy wallet</td>
<td><a href="/sdk/getting-started">Getting Started with the SDK</a></td>
</tr>
</tbody></table>
<p>If you are only here for one thing, read
<a href="/notes-and-nullifiers">Notes &amp; Nullifiers</a>. Nearly every other page assumes
it.</p>
<h2 id="what-stays-private-and-what-doesn39t">What stays private, and what doesn&#39;t<a class="anchor" href="#what-stays-private-and-what-doesn39t" aria-label="Link to this section">#</a></h2>
<p>This matters enough to say on the first page. Inside the pool, the sender,
receiver, token, amount, and which notes were spent are all private. Deposits
and withdrawals are public ERC-20 legs, and so is the timing of your
interactions. Privacy here is real but bounded, and
<a href="/compliance">Compliance &amp; Auditing</a> covers the disclosure path for when you
need to prove something to a regulator.</p>
<h2 id="conventions-on-this-site">Conventions on this site<a class="anchor" href="#conventions-on-this-site" aria-label="Link to this section">#</a></h2>
<ul>
<li>Pages are ordered as a reading path. The <strong>Previous / Next</strong> links at the
bottom of each page follow it.</li>
<li>Code blocks are copyable, and every page can be taken away as Markdown or
handed to an assistant with the actions under its title.</li>
<li><code>typescript</code> snippets are SDK-level; <code>cairo</code> snippets are contract-level.</li>
</ul>
`

export default html
