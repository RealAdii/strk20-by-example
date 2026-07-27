// metadata
export const version = "0.14.3"
export const title = "Encryption & Viewing Keys"
export const description =
  "How viewing keys, domain-separated masking and ECDH on the STARK curve keep note data private"
export const githubLink = ""
export const githubLabel = ""

export const keywords = [
  "viewing key",
  "encryption",
  "ecdh",
  "stark curve",
  "masking",
  "auditor",
]

export const codes = []

// Raw markdown source, for "View as Markdown" / "Copy for LLM".
export const markdown = `
Every participant in the pool has a **viewing keypair**:

| Key                 | Symbol | Who has it    | Used for                                            |
| ------------------- | ------ | ------------- | --------------------------------------------------- |
| Private viewing key | \`k\`    | The user only | Decrypting notes, deriving channel keys, nullifiers |
| Public viewing key  | \`K\`    | On-chain      | Letting others encrypt notes and channels _to_ you  |

\`K = k·G\` on the STARK curve. The public key is **registered once** via the
\`SetViewingKey\` action and treated as immutable - every channel ever opened to
you is derived from it, so it cannot change without breaking discovery.

## Symmetric masking

Inside a channel, data is hidden with cheap "hash-and-add" masking rather than
heavyweight ciphers. Each field gets its own **domain-separated Poseidon hash**
plus a per-use **salt**, so no mask is ever reused:

\`\`\`
enc_amount = (h(ENC_AMOUNT_TAG, channel_key, token, index, 0, salt) + amount) mod 2^128
enc_token  =  h(ENC_TOKEN_TAG,  channel_key, index, 0, salt) + token
\`\`\`

Anyone holding the channel key recomputes the mask and subtracts it off.
Anyone without it sees values indistinguishable from random field elements.
The domain tags (\`ENC_AMOUNT_TAG:V1\`, \`ENC_TOKEN_TAG:V1\`, …) guarantee that a
mask derived for one purpose can never be replayed in another context.

## Asymmetric encryption: ECDH with ephemeral keys

Symmetric masking needs a shared secret - the channel key. Establishing it uses
**ECDH on the STARK curve** with a fresh ephemeral key per channel:

\`\`\`
sender picks random r
publishes   rG            (ephemeral public key)
computes    shared = r·K  (recipient's public viewing key)

enc_channel_key = h(ENC_CHANNEL_KEY_TAG, shared.x) + channel_key
enc_sender_addr = h(ENC_SENDER_ADDR_TAG, shared.x) + sender_addr
\`\`\`

The recipient computes the same secret from the other side: \`k·(rG) = r·K\`.
An observer sees only \`rG\` and two masked values - they learn that _a_ channel
was opened, not by whom or to whom.

## The auditor copy

At registration, the user's private viewing key \`k\` is also encrypted - with
the same ephemeral ECDH pattern - to the **auditor's public key** and stored
on-chain. This single escrowed ciphertext is what enables compliance: an
auditor under lawful process can recover \`k\` and decrypt that user's history,
while everyone else's data stays private. See
[Compliance & Auditing](/compliance).

## Why open notes skip masking

An **open note** carries its amount in plaintext, using the protocol-reserved
salt. This is deliberate: when a DeFi interaction (say, an AMM swap) produces
an output amount that is only known at execution time, the client cannot mask
it in advance - the mask is part of the proven transaction, but the amount
isn't decided until the anonymizer contract runs on-chain. Open notes trade amount
privacy for that late binding; ownership and subsequent spends remain private.

## Rule of thumb

- Everything derivable from \`k\` + public on-chain data → readable by you.
- Everything else → opaque Poseidon outputs and masked field elements.

Next: where encrypted notes are filed and how recipients find them -
[Channels & Note Discovery](/channels-and-subchannels).
`

const html = `<p>Every participant in the pool has a <strong>viewing keypair</strong>:</p>
<table>
<thead>
<tr>
<th>Key</th>
<th>Symbol</th>
<th>Who has it</th>
<th>Used for</th>
</tr>
</thead>
<tbody><tr>
<td>Private viewing key</td>
<td><code>k</code></td>
<td>The user only</td>
<td>Decrypting notes, deriving channel keys, nullifiers</td>
</tr>
<tr>
<td>Public viewing key</td>
<td><code>K</code></td>
<td>On-chain</td>
<td>Letting others encrypt notes and channels <em>to</em> you</td>
</tr>
</tbody></table>
<p><code>K = k·G</code> on the STARK curve. The public key is <strong>registered once</strong> via the
<code>SetViewingKey</code> action and treated as immutable - every channel ever opened to
you is derived from it, so it cannot change without breaking discovery.</p>
<h2 id="symmetric-masking">Symmetric masking<a class="anchor" href="#symmetric-masking" aria-label="Link to this section">#</a></h2>
<p>Inside a channel, data is hidden with cheap "hash-and-add" masking rather than
heavyweight ciphers. Each field gets its own <strong>domain-separated Poseidon hash</strong>
plus a per-use <strong>salt</strong>, so no mask is ever reused:</p>
<pre><code>enc_amount = (h(ENC_AMOUNT_TAG, channel_key, token, index, 0, salt) + amount) mod 2^128
enc_token  =  h(ENC_TOKEN_TAG,  channel_key, index, 0, salt) + token
</code></pre><p>Anyone holding the channel key recomputes the mask and subtracts it off.
Anyone without it sees values indistinguishable from random field elements.
The domain tags (<code>ENC_AMOUNT_TAG:V1</code>, <code>ENC_TOKEN_TAG:V1</code>, …) guarantee that a
mask derived for one purpose can never be replayed in another context.</p>
<h2 id="asymmetric-encryption-ecdh-with-ephemeral-keys">Asymmetric encryption: ECDH with ephemeral keys<a class="anchor" href="#asymmetric-encryption-ecdh-with-ephemeral-keys" aria-label="Link to this section">#</a></h2>
<p>Symmetric masking needs a shared secret - the channel key. Establishing it uses
<strong>ECDH on the STARK curve</strong> with a fresh ephemeral key per channel:</p>
<pre><code>sender picks random r
publishes   rG            (ephemeral public key)
computes    shared = r·K  (recipient&#x27;s public viewing key)

enc_channel_key = h(ENC_CHANNEL_KEY_TAG, shared.x) + channel_key
enc_sender_addr = h(ENC_SENDER_ADDR_TAG, shared.x) + sender_addr
</code></pre><p>The recipient computes the same secret from the other side: <code>k·(rG) = r·K</code>.
An observer sees only <code>rG</code> and two masked values - they learn that <em>a</em> channel
was opened, not by whom or to whom.</p>
<h2 id="the-auditor-copy">The auditor copy<a class="anchor" href="#the-auditor-copy" aria-label="Link to this section">#</a></h2>
<p>At registration, the user&#39;s private viewing key <code>k</code> is also encrypted - with
the same ephemeral ECDH pattern - to the <strong>auditor&#39;s public key</strong> and stored
on-chain. This single escrowed ciphertext is what enables compliance: an
auditor under lawful process can recover <code>k</code> and decrypt that user&#39;s history,
while everyone else&#39;s data stays private. See
<a href="/compliance">Compliance &amp; Auditing</a>.</p>
<h2 id="why-open-notes-skip-masking">Why open notes skip masking<a class="anchor" href="#why-open-notes-skip-masking" aria-label="Link to this section">#</a></h2>
<p>An <strong>open note</strong> carries its amount in plaintext, using the protocol-reserved
salt. This is deliberate: when a DeFi interaction (say, an AMM swap) produces
an output amount that is only known at execution time, the client cannot mask
it in advance - the mask is part of the proven transaction, but the amount
isn&#39;t decided until the anonymizer contract runs on-chain. Open notes trade amount
privacy for that late binding; ownership and subsequent spends remain private.</p>
<h2 id="rule-of-thumb">Rule of thumb<a class="anchor" href="#rule-of-thumb" aria-label="Link to this section">#</a></h2>
<ul>
<li>Everything derivable from <code>k</code> + public on-chain data → readable by you.</li>
<li>Everything else → opaque Poseidon outputs and masked field elements.</li>
</ul>
<p>Next: where encrypted notes are filed and how recipients find them -
<a href="/channels-and-subchannels">Channels &amp; Note Discovery</a>.</p>
`

export default html
