import EthCrypto from 'eth-crypto';

export const formatAddress = (address: string) => {
    return (
      address.substring(0, 4) + "..." + address.substring(address.length - 4)
    );
  };
  
export const encryptMessage = async (publicKey: string, message: string, signature: string) => {
  console.log(publicKey);

  const payload = {
    message: message,
    signature: signature
  }
  const encryptedMessage = await EthCrypto.encryptWithPublicKey(publicKey, JSON.stringify(payload));
  return EthCrypto.cipher.stringify(encryptedMessage);
}