# Getting Started

> Build privacy wallets on Starknet with the low-level STRK20 SDK and createPrivateTransfers

Source: https://strk20-by-example.org/sdk/getting-started

These pages are for teams building **privacy wallets on Starknet** or advanced
integrations that manage their own account, keys, note discovery, and proving.
If you are building a private dapp on top of an existing wallet, use the
[Starknet Wallet API](/starknet-wallet-api/overview) instead - it keeps viewing
keys inside the wallet. Everything here goes through one factory:
`createPrivateTransfers`.

## Install

```shell
npm install @starkware-libs/starknet-privacy-sdk
```

## Wire it up

The factory needs a Starknet account plus three providers: a **viewing key
provider** (your privacy key), a **proving provider** (generates validity proofs)
and a **discovery provider** (finds your notes and channels).

```typescript
import { Account, RpcProvider, constants } from "starknet"
import {
  createPrivateTransfers,
  ProvingServiceProofProvider,
} from "@starkware-libs/starknet-privacy-sdk"
// Deep import - the root export's type does not currently match the
// interface the factory expects.
// @ts-expect-error
import { IndexerDiscoveryProvider } from "@starkware-libs/starknet-privacy-sdk/dist/internal/indexer-discovery.js"

const provider = new RpcProvider({ nodeUrl: process.env.RPC_URL! })

// cairoVersion "1" is required for accounts sending v3 transactions
const account = new Account({
  provider,
  address: process.env.ACCOUNT_ADDRESS!,
  signer: process.env.ACCOUNT_PRIVATE_KEY!,
  cairoVersion: "1",
})

const transfers = createPrivateTransfers({
  account,
  // The viewing key MUST be a bigint. A hex string silently misbehaves
  // downstream (wrong channel-key derivation).
  viewingKeyProvider: {
    getViewingKey: async () => BigInt(process.env.VIEWING_KEY!),
  },
  provingProvider: new ProvingServiceProofProvider(
    process.env.PROVING_SERVICE_URL!,
    constants.StarknetChainId.SN_SEPOLIA,
  ),
  discoveryProvider: new IndexerDiscoveryProvider(
    process.env.INDEXER_URL!,
    process.env.POOL_ADDRESS!,
  ),
  poolContractAddress: process.env.POOL_ADDRESS!,
})
```

## Your first transaction

Every operation follows the same shape: `build()` a batch of operations, then
`execute()` it and submit the resulting call.

```typescript
// Prove against a slightly older block: notes mature 10 blocks after
// creation, and proving at the chain head risks reorg invalidation.
const provingBlockId = (await provider.getBlockNumber()) - 10

const { callAndProof } = await transfers.build().register().execute({ provingBlockId })

// Omit proof keys entirely when there are no proof facts - passing
// empty arrays serializes an invalid v3 transaction.
const proofDetails = callAndProof.proof.proofFacts?.length
  ? { proofFacts: callAndProof.proof.proofFacts, proof: callAndProof.proof.data }
  : {}

// tip is mandatory for v3 transactions in starknet.js
const tx = await account.execute(callAndProof.call, { tip: 0n, ...proofDetails })

await provider.waitForTransaction(tx.transaction_hash)
console.log(`registered in tx ${tx.transaction_hash}`)
```

This submission tail - back off `provingBlockId`, conditionally spread
`proofDetails`, pass `tip: 0n`, wait - is identical for every operation in the
following pages. We will not repeat the explanation, just the code.

## What each provider does

| Provider             | Role                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `viewingKeyProvider` | Supplies the private viewing key `k` used to decrypt notes and derive nullifiers                                                                       |
| `provingProvider`    | Sends your signed invocation to a proving service, which executes it in a virtual Starknet environment and returns a STARK proof                       |
| `discoveryProvider`  | Scans your channels for incoming notes. `IndexerDiscoveryProvider` (HTTP service, production) or `ContractDiscoveryProvider` (direct RPC, development) |

Next: register your viewing key so you can receive private transfers.
