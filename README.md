# Wakumono

A proof of concept for encrypted, direct messaging using only someone's Ethereum address and Waku V2 as the transport layer

## Usage

- Connect to Metamask
    - The requested signature is used to derive a chat key for encrypting messages sent over Waku
- Connect to Waku
    - Start a Waku node and connect to the Waku Store nodes to retrieve previously sent messages
- Broadcast Chatkey
    - Broadcasts your chat key to the Waku network so others can send you secure, direct messages
- Send Message
    Put someone's ethereum address in the first box, type a message in the second, and hit send.  That user should shortly see a message from your address in the message log
