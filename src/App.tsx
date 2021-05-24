import {
  Button,
  Center, ChakraProvider,
  Heading,
  HStack,
  Input, useToast, VStack
} from "@chakra-ui/react";
import Onboard from "bnc-onboard";
import { ethers } from "ethers";
import { getStatusFleetNodes, StoreCodec, Waku, WakuMessage } from "js-waku";
import PeerId from "peer-id";
import React from "react";
import WalletDisplay from "./components/walletDisplay";
import GlobalContext, { initialState, reducer } from "./context/globalContext";
import { encryptMessage } from "./helpers/helpers";
import EthCrypto from 'eth-crypto';
import ChatBox from "./components/chatBox";

let web3: ethers.providers.Web3Provider;

export const ChatContentTopic = "dingus";

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [msgText, setMsg] = React.useState("");
  const [toAddress, setTo] = React.useState("");
  const toast = useToast();

  const handleRelayMessage = async (wakuMsg: WakuMessage) => {
    try {
      const msg = JSON.parse(wakuMsg.payloadAsUtf8);
      if (msg.chatKey) {
        dispatch({
          type: "ADD_PEER",
          payload: { [msg.address.toLowerCase()]: msg.chatKey },
        });
      }
    } catch (err) {
      if (wakuMsg.payload && state.keys) {
        try {
          const decryptedMessage = await EthCrypto.decryptWithPrivateKey(state.keys!.privateKey,EthCrypto.cipher.parse(wakuMsg.payloadAsUtf8));
          const decryptedPayload = JSON.parse(decryptedMessage);
          const senderAddress = ethers.utils.verifyMessage(decryptedPayload.message, decryptedPayload.signature);
          console.log(`Got a secret message: ${decryptedPayload.message} from ${senderAddress}`);
          dispatch({ type: 'ADD_MESSAGE', payload: { from: senderAddress ?? 'nobody', message: decryptedPayload.message}})
        }
        catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleMessageSend = async (to: string, msgText: string) => {
    if (!state.web3) {
      return;
    }

    const sig = await state.web3.getSigner().signMessage(msgText);
    const encryptedMessage = await encryptMessage(state.addressBook![to.toLowerCase()], msgText, sig);
    const msg = WakuMessage.fromUtf8String(encryptedMessage, ChatContentTopic);
    state.waku?.relay.send(msg);
  };

  const handleProtocolChange = async (
    waku: Waku,
    { peerId, protocols }: { peerId: PeerId; protocols: string[] }
  ) => {
    if (protocols.includes(StoreCodec)) {
      try {
        const response = await waku.store.queryHistory({
          peerId: peerId,
          contentTopics: [ChatContentTopic],
        });
        if (response) {
            response.map((wakuMsg) => handleRelayMessage(wakuMsg));
        }
      } catch (e) {
        console.log(
          `${peerId.toB58String()}: error encountered when retrieving archived messages`,
          e
        );
      }
    }
  };

  const startUp = async () => {
    try {
      const waku = await Waku.create({
        config: {
          pubsub: {
            enabled: true,
            emitSelf: true,
          },
        },
      });

      waku.addPeerToAddressBook(
        "16Uiu2HAmPLe7Mzm8TsYUubgCAW1aJoeFScxrLj8ppHFivPo97bUZ",
        ["/dns4/node-01.do-ams3.jdev.misc.statusim.net/tcp/7010/wss"]
      );

      const nodes = await getStatusFleetNodes();
      await Promise.all(
        nodes.map((addr) => {
          return waku.dial(addr);
        })
      );

      dispatch({ type: "START_WAKU", payload: { waku: waku } });
      waku.relay.addObserver(handleRelayMessage, [ChatContentTopic]);

      waku.libp2p.peerStore.on(
        "change:protocols",
        handleProtocolChange.bind({}, waku)
      );
    } catch (e) {
      console.log("Issue starting waku ", e);
    }
  };

  React.useEffect(() => {
//    startUp();
    return () => {
      state.waku?.libp2p.peerStore.removeListener(
        "change:protocols",
        handleProtocolChange.bind({}, state.waku)
      );
    };
  }, []);

  const wallets = [{ walletName: "metamask", preferred: true }];
  const onboard = Onboard({
    networkId: 1,
    subscriptions: {
      wallet: async (wallet) => {
        try {
          //@ts-ignore
          if (window.ethereum) {
            //@ts-ignore
            window.ethereum.enable();
          }
          web3 = new ethers.providers.Web3Provider(wallet.provider);
          dispatch({ type: "SET_WEB3", payload: { web3: web3 } });
          deriveChatKey();
        } catch (err) {
          console.log(err);
          toast({
            position: "top",
            status: "error",
            title: "Something went wrong",
            description: err?.toString(),
            duration: 5000,
          });
        }
      },
      address: (address) => {
        dispatch({ type: "SET_ADDRESS", payload: { address: address } });
      },
      balance: (balance) => {
        dispatch({ type: "SET_BALANCE", payload: { balance: balance } });
      },
      network: (network) => {
        dispatch({ type: "SET_CHAIN", payload: { chain: network } });
      },
    },
    walletSelect: {
      wallets: wallets,
    },
  });

  const deriveChatKey = async () => {
    let signature = await web3
      .getSigner()
      .signMessage("make it so, Number One");
    let chatKeyPair = await EthCrypto.createIdentity(Buffer.from(signature));
    dispatch({ type: "SET_KEYS", payload: { keys: chatKeyPair } });
  };

  const broadcastChatKey = async () => {
    if (!state.keys) {
      return;
    }
    
    const signedPubKeysignature = await web3
      .getSigner()
      .signMessage(state.keys.address);
    const msg = WakuMessage.fromUtf8String(
      JSON.stringify({
        address: state.address,
        chatKey: state.keys.publicKey,
        signature: signedPubKeysignature,
      }),
      ChatContentTopic
    );
    state.waku?.relay.send(msg);
  };

  const handleConnect = async () => {
    dispatch({ type: "SET_ONBOARD", payload: { onboard: onboard } });
    try {
      const walletSelected = await onboard.walletSelect();
    } catch (err) {
      console.log(err);
      toast({
        position: "top",
        status: "error",
        title: "Something went wrong",
        description: err?.toString(),
        duration: 5000,
      });
    }
  };

  return (
    <ChakraProvider>
      <GlobalContext.Provider value={{ dispatch, state }}>
        <Center h="90vh">
          <VStack>
            <Heading>WakuMono</Heading>
            <WalletDisplay handleConnect={handleConnect} />
            <Button onClick={startUp}>Connect to Waku</Button>
            <Button onClick={broadcastChatKey}>Broadcast ChatKey</Button>
            <HStack>
              <VStack>
              <Input
                value={toAddress}
                placeholder="Address"
                onChange={(evt) => setTo(evt.target.value)}
              />
              </VStack>
              <Input
                value={msgText}
                placeholder="Enter a message"
                onChange={(evt) => setMsg(evt.target.value)}
              />
              <Button
                onClick={() => {
                  handleMessageSend(toAddress, msgText);
                }}
              >
                Send Message
              </Button>
            </HStack>
            <ChatBox />
          </VStack>
        </Center>
      </GlobalContext.Provider>
    </ChakraProvider>
  );
}

export default App;
