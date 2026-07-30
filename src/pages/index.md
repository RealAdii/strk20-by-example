---
title: Introduction
version: 0.14.3
description: Learn Starknet Privacy (STRK20) with simple, runnable examples covering private transfers on a public chain, Cairo anonymizer contracts, and wallet-builder SDK flows
keywords:
  [introduction, strk20, starknet privacy, by example, getting started, overview]
---

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
  Wallet API for private dapps through `starknet.js`.
- **Build privacy wallets:** the low-level SDK, for wallets and backends that
  need direct control over registration, note discovery, and proving.

## Where to start

Pick the row that matches what you're building:

| If you want to                          | Start at                                             |
| --------------------------------------- | ---------------------------------------------------- |
| Understand what STRK20 actually is      | [What is STRK20?](/what-is-strk20)                   |
| Choose an integration route             | [Builder Privacy Overview](/overview)                |
| Add private DeFi to an app              | [Anonymizer Contracts](/helpers/privacy-invoke)      |
| Build a private dapp with `starknet.js` | [Starknet Wallet API](/starknet-wallet-api/overview) |
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
- `typescript` snippets are SDK-level; `cairo` snippets are contract-level.
