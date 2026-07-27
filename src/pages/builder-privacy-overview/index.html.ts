// metadata
export const version = "0.14.3"
export const title = "Builder Privacy Overview"
export const description =
  "Choose the right STRK20 integration path: Starknet Wallet API, anonymizer contracts, building privacy wallets, sub-accounts, or prover infrastructure."
export const githubLink = ""
export const githubLabel = ""

export const keywords = [
  "builder overview",
  "privacy stack",
  "starknet wallet api",
  "wallet api",
  "build privacy wallets",
  "privacy wallet sdk",
  "anonymizer contracts",
  "sub-accounts",
  "prover",
  "strk20",
]

export const codes = []

// Raw markdown source, for "View as Markdown" / "Copy for LLM".
export const markdown = `
STRK20 is a privacy pool plus a small set of integration surfaces. Start with
the narrowest surface that keeps user keys in the right place and only move to a
lower-level route when your product needs more control.

## Quick decision guide

| If you want to...                                                                           | Use...                                                                                                   | Why                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Build a private dapp anywhere from private DeFi, private consumer apps, private games, etc. | [Anonymizer contracts](/helpers/privacy-invoke) and [Starknet Wallet API](/starknet-wallet-api/overview) | The wallet manages viewing keys, notes, proving, and submission; for DeFi, the pool calls your \`privacy_invoke\` adapter atomically, then credits the result back into private notes. |
| Build a privacy wallet on Starknet                                                          | [Build Privacy Wallets](/sdk/getting-started)                                                            | Direct access to registration, channels, note discovery, transaction building, and proving configuration.                                                                            |
| Operate proving infrastructure yourself                                                     | Prover backend                                                                                           | For wallets and infrastructure teams that need control over proof generation.                                                                                                        |
| Hide the link between a user's main wallet and app activity                                 | Private sub-accounts (coming soon)                                                                       | Advanced account-based privacy route; verify wallet and API support before relying on it.                                                                                            |

## Core surfaces

### STRK20 pool

The pool is the base contract layer. Deposits move public ERC-20 tokens into the
pool, private transfers spend encrypted notes inside the pool, and withdrawals
move tokens back to a public address. Movement inside the pool hides sender,
receiver, token, amount, and spent notes from public observers.

### Starknet Wallet API

This is the recommended route for most **private dapps**. Your dapp asks the
user's privacy-enabled wallet to perform an action; the wallet handles private
state, proofs, and submission. A normal dapp should not receive the user's
viewing key or manage note discovery directly. See the
[Starknet Wallet API overview](/starknet-wallet-api/overview).

### Anonymizer contracts

Anonymizer contracts, also called helper contracts, are app-specific Cairo
adapters for private DeFi. The pool withdraws tokens to the helper, calls its
\`privacy_invoke\` entry point, and the helper returns \`OpenNoteDeposit\`
instructions for whatever should be credited back into private notes. This is the
focus for **core builders shipping private dapps**. See
[Anonymizer Contract Anatomy](/helpers/privacy-invoke).

### Build Privacy Wallets

The Build Privacy Wallets section is the lower-level SDK route for teams building
**privacy wallets on Starknet**, account-controlled backends, and advanced
integrators. Use it when you need to
manage registration, channels, note discovery, transaction construction, and
proving providers yourself. See [Build Privacy Wallets](/sdk/getting-started).

### Private sub-accounts (coming soon)

Private sub-accounts are for account-based app activity where the user does not
want a public onchain link to their main wallet. Treat this as an advanced route:
confirm wallet, SDK, API, and audit readiness before building a production flow
around it.

### Prover backend

Most dapps do not need to operate proving infrastructure. Wallets,
infrastructure teams, and advanced integrators may run their own prover when
they need operational control over proof generation. Deposit screening applies
regardless of proving route: FPI screens shielding addresses and signs each
deposit, and the pool verifies the signature onchain, so a self-hosted prover
meets the same deposit-screening requirement as hosted services.

## Builder rules of thumb

- Use the Starknet Wallet API first for user-facing private dapps.
- Use Build Privacy Wallets when you are building the wallet itself or need low-level SDK control.
- Do not ask a normal dapp user for their viewing key.
- For private DeFi integrations, expect both a Starknet Wallet API flow and an app-specific anonymizer contract.
- Deposits are screened on every route - self-hosted proving does not bypass onchain screening.
- Be explicit about what remains public: deposits, withdrawals, timing, and some app-side activity may still be visible.
- Verify wallet support, API versions, contract addresses, and compliance assumptions before launch.

## Read next

- [What is STRK20?](/what-is-strk20)
- [Starknet Wallet API](/starknet-wallet-api/overview)
- [Anonymizer Contract Anatomy](/helpers/privacy-invoke)
- [Build Privacy Wallets](/sdk/getting-started)
`

const html = `<p>STRK20 is a privacy pool plus a small set of integration surfaces. Start with
the narrowest surface that keeps user keys in the right place and only move to a
lower-level route when your product needs more control.</p>
<h2 id="quick-decision-guide">Quick decision guide<a class="anchor" href="#quick-decision-guide" aria-label="Link to this section">#</a></h2>
<table>
<thead>
<tr>
<th>If you want to...</th>
<th>Use...</th>
<th>Why</th>
</tr>
</thead>
<tbody><tr>
<td>Build a private dapp anywhere from private DeFi, private consumer apps, private games, etc.</td>
<td><a href="/helpers/privacy-invoke">Anonymizer contracts</a> and <a href="/starknet-wallet-api/overview">Starknet Wallet API</a></td>
<td>The wallet manages viewing keys, notes, proving, and submission; for DeFi, the pool calls your <code>privacy_invoke</code> adapter atomically, then credits the result back into private notes.</td>
</tr>
<tr>
<td>Build a privacy wallet on Starknet</td>
<td><a href="/sdk/getting-started">Build Privacy Wallets</a></td>
<td>Direct access to registration, channels, note discovery, transaction building, and proving configuration.</td>
</tr>
<tr>
<td>Operate proving infrastructure yourself</td>
<td>Prover backend</td>
<td>For wallets and infrastructure teams that need control over proof generation.</td>
</tr>
<tr>
<td>Hide the link between a user&#39;s main wallet and app activity</td>
<td>Private sub-accounts (coming soon)</td>
<td>Advanced account-based privacy route; verify wallet and API support before relying on it.</td>
</tr>
</tbody></table>
<h2 id="core-surfaces">Core surfaces<a class="anchor" href="#core-surfaces" aria-label="Link to this section">#</a></h2>
<h3 id="strk20-pool">STRK20 pool<a class="anchor" href="#strk20-pool" aria-label="Link to this section">#</a></h3>
<p>The pool is the base contract layer. Deposits move public ERC-20 tokens into the
pool, private transfers spend encrypted notes inside the pool, and withdrawals
move tokens back to a public address. Movement inside the pool hides sender,
receiver, token, amount, and spent notes from public observers.</p>
<h3 id="starknet-wallet-api">Starknet Wallet API<a class="anchor" href="#starknet-wallet-api" aria-label="Link to this section">#</a></h3>
<p>This is the recommended route for most <strong>private dapps</strong>. Your dapp asks the
user&#39;s privacy-enabled wallet to perform an action; the wallet handles private
state, proofs, and submission. A normal dapp should not receive the user&#39;s
viewing key or manage note discovery directly. See the
<a href="/starknet-wallet-api/overview">Starknet Wallet API overview</a>.</p>
<h3 id="anonymizer-contracts">Anonymizer contracts<a class="anchor" href="#anonymizer-contracts" aria-label="Link to this section">#</a></h3>
<p>Anonymizer contracts, also called helper contracts, are app-specific Cairo
adapters for private DeFi. The pool withdraws tokens to the helper, calls its
<code>privacy_invoke</code> entry point, and the helper returns <code>OpenNoteDeposit</code>
instructions for whatever should be credited back into private notes. This is the
focus for <strong>core builders shipping private dapps</strong>. See
<a href="/helpers/privacy-invoke">Anonymizer Contract Anatomy</a>.</p>
<h3 id="build-privacy-wallets">Build Privacy Wallets<a class="anchor" href="#build-privacy-wallets" aria-label="Link to this section">#</a></h3>
<p>The Build Privacy Wallets section is the lower-level SDK route for teams building
<strong>privacy wallets on Starknet</strong>, account-controlled backends, and advanced
integrators. Use it when you need to
manage registration, channels, note discovery, transaction construction, and
proving providers yourself. See <a href="/sdk/getting-started">Build Privacy Wallets</a>.</p>
<h3 id="private-sub-accounts-coming-soon">Private sub-accounts (coming soon)<a class="anchor" href="#private-sub-accounts-coming-soon" aria-label="Link to this section">#</a></h3>
<p>Private sub-accounts are for account-based app activity where the user does not
want a public onchain link to their main wallet. Treat this as an advanced route:
confirm wallet, SDK, API, and audit readiness before building a production flow
around it.</p>
<h3 id="prover-backend">Prover backend<a class="anchor" href="#prover-backend" aria-label="Link to this section">#</a></h3>
<p>Most dapps do not need to operate proving infrastructure. Wallets,
infrastructure teams, and advanced integrators may run their own prover when
they need operational control over proof generation. Deposit screening applies
regardless of proving route: FPI screens shielding addresses and signs each
deposit, and the pool verifies the signature onchain, so a self-hosted prover
meets the same deposit-screening requirement as hosted services.</p>
<h2 id="builder-rules-of-thumb">Builder rules of thumb<a class="anchor" href="#builder-rules-of-thumb" aria-label="Link to this section">#</a></h2>
<ul>
<li>Use the Starknet Wallet API first for user-facing private dapps.</li>
<li>Use Build Privacy Wallets when you are building the wallet itself or need low-level SDK control.</li>
<li>Do not ask a normal dapp user for their viewing key.</li>
<li>For private DeFi integrations, expect both a Starknet Wallet API flow and an app-specific anonymizer contract.</li>
<li>Deposits are screened on every route - self-hosted proving does not bypass onchain screening.</li>
<li>Be explicit about what remains public: deposits, withdrawals, timing, and some app-side activity may still be visible.</li>
<li>Verify wallet support, API versions, contract addresses, and compliance assumptions before launch.</li>
</ul>
<h2 id="read-next">Read next<a class="anchor" href="#read-next" aria-label="Link to this section">#</a></h2>
<ul>
<li><a href="/what-is-strk20">What is STRK20?</a></li>
<li><a href="/starknet-wallet-api/overview">Starknet Wallet API</a></li>
<li><a href="/helpers/privacy-invoke">Anonymizer Contract Anatomy</a></li>
<li><a href="/sdk/getting-started">Build Privacy Wallets</a></li>
</ul>
`

export default html
