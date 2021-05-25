import EthCrypto from 'eth-crypto';
import { ethIdentity } from '../context/globalContext';

export const formatAddress = (address: string) => {
    return (
      address.substring(0, 4) + "..." + address.substring(address.length - 4)
    );
  };
  
export const encryptMessage = async (keys: ethIdentity, publicKey: string, message: string) => {
  const payload = {
    message: message,
    childSig: EthCrypto.sign(keys.privateKey, EthCrypto.hash.keccak256(message))
  }
  const encryptedMessage = await EthCrypto.encryptWithPublicKey(publicKey, JSON.stringify(payload));
  return EthCrypto.cipher.stringify(encryptedMessage);
}