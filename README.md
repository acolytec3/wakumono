# Wakumono

A proof of concept for encrypted, direct messaging using only Ethereum addresses and Waku V2.  Only you can read the messages someone sends to you!

## Usage

- Connect to Metamask
    - The requested signature is used to derive a chat key for encrypting/decrypting messages sent over Waku
- Connect to Waku
    - Start a Waku node and connect to the Waku Store nodes to retrieve previously sent messages
- Broadcast Chatkey
    - Broadcasts your chat key to the Waku network so others can send you secure, direct messages
- Send Message
    - Put someone's ethereum address in the first box, type a message in the second, and hit send.  That user should shortly see a message from your address in the message log

## Limitations

Messages can currently only be sent to addresses that have already broadcast their chatkey.

## Technical Details

Wakumono derives chatkeys for securing communication via the [Eth-Crypto](https://github.com/pubkey/eth-crypto) module.  Chatkeys are derived by generating a signature using your ethereum address as a source of randomness to generate a set of child keys which conform to the [ED25519 spec](https://ed25519.cr.yp.to/) which are used to encrypt and decrypt messages.  The public key for this chatkey is broadcasted to the Waku network along with a message linking it to the parent Ethereum address along with as separate signature verifying that the child key belongs to the parent key.  