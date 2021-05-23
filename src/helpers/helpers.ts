import { ethers, BigNumber } from 'ethers';
import PeerId from 'peer-id';
import crypto from 'libp2p-crypto';

export const formatAddress = (address: string) => {
    return (
      address.substring(0, 4) + "..." + address.substring(address.length - 4)
    );
  };
  
export const encryptMessage = async (publicKey: string, message: string) => {
  const pubID = await PeerId.createFromPubKey(publicKey);
  const encryptionKey = crypto.keys.unmarshalPublicKey(pubID.marshalPubKey()) as crypto.keys.supportedKeys.rsa.RsaPublicKey;
  const secretMessage = encryptionKey.encrypt(new TextEncoder().encode(message));
  return secretMessage;
}