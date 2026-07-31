# Discovery Providers

> Choose between IndexerDiscoveryProvider and ContractDiscoveryProvider

Source: https://strk20-by-example.org/sdk/discovery-providers

Everything on the previous page - `discoverNotes`, `discoverChannels`,
`discoverRequirement`, the `autoDiscover` options - is served by the
`discoveryProvider` you wired into `createPrivateTransfers`. The SDK ships
two implementations.

| Provider                    | Backend                        | Use for                                                         |
| --------------------------- | ------------------------------ | --------------------------------------------------------------- |
| `IndexerDiscoveryProvider`  | Discovery service over HTTP    | Production - pagination and reorg detection handled server-side |
| `ContractDiscoveryProvider` | Pool contract via Starknet RPC | Development, testing, no-extra-infra setups                     |

## IndexerDiscoveryProvider

```typescript
// Deep import - the package-root export's TypeScript declaration does not
// currently satisfy DiscoveryProviderInterface at v0.14.2.
// @ts-expect-error
import { IndexerDiscoveryProvider } from "@starkware-libs/starknet-privacy-sdk/dist/internal/indexer-discovery.js"

const discoveryProvider = new IndexerDiscoveryProvider(
  process.env.INDEXER_URL!,
  process.env.POOL_ADDRESS!, // hex string, like everywhere else
)
```

The deep import is a temporary workaround, not a style choice: importing
from the package root type-errors even though it works at runtime. When the
SDK ships type-clean exports, drop the deep path and the `@ts-expect-error`
in the same change.

## ContractDiscoveryProvider

```typescript
import { ContractDiscoveryProvider } from "@starkware-libs/starknet-privacy-sdk"

const discoveryProvider = new ContractDiscoveryProvider(poolContract, {
  rateLimit: { maxConcurrent: 4, minDelay: 100 },
})
```

It replays pool events by querying the contract directly - every scan is a
burst of RPC calls. The `rateLimit` option (max concurrent requests plus a
minimum delay between them) keeps you under public-RPC rate limits; without
it, a full scan against a free endpoint gets you HTTP 429s mid-discovery.

## Things to notice

- Both satisfy the same `DiscoveryProviderInterface` - swap them behind an
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
