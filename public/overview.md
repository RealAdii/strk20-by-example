# Overview

> A concise builder overview for choosing the right STRK20 integration route

Source: https://strk20-by-example.org/overview

Here's everything about getting started with building private applications.

Starknet privacy has a small set of builder surfaces. Start with the highest-level
route that fits your product, and only move lower when you need more control.

## Choose your integration route

| Builder goal                                                                                | Start with                                                                                               |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Build a private dapp anywhere from private DeFi, private consumer apps, private games, etc. | [Anonymizer Contracts](/helpers/privacy-invoke) and [Starknet Wallet API](/starknet-wallet-api/overview) |
| Build a privacy wallet or advanced backend                                                  | [Build Privacy Wallets](/sdk/getting-started)                                                            |
| Run proof infrastructure yourself                                                           | Prover backend                                                                                           |
| Hide a user's main-wallet link during account-based app activity                            | Private sub-accounts (coming soon)                                                                       |

## Core pieces

- **STRK20 Pool:** the live Starknet mainnet pool that holds ERC-20s as encrypted
  notes and enables shielded balances, private transfers, and private DeFi.
- **Starknet Wallet API / starknet.js:** the standard route for private dapps. The
  app asks the wallet to act; the wallet manages viewing keys, notes, proofs, and
  signatures.
- **Anonymizer contracts:** app-specific `privacy_invoke` adapters for DeFi. The pool
  calls the helper atomically, then credits the result back into private notes.
- **Privacy SDK:** the low-level route for wallets and advanced integrations that
  need direct control over registration, channels, note discovery, and proving.
- **Private sub-accounts (coming soon):** an advanced account-privacy route for hiding the public
  link between a user's main wallet and app activity.
- **Prover backend:** infrastructure for teams that need to operate their own proof
  generation.

## What stays visible

Inside the pool, sender, receiver, token, amount, and spent notes are private.
Deposits, withdrawals, timing, and some app-side activity may still be public.

## Read next

- [Anonymizer Contracts](/helpers/privacy-invoke)
- [Starknet Wallet API](/starknet-wallet-api/overview)
- [Build Privacy Wallets](/sdk/getting-started)
