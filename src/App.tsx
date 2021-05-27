import {
  Button,
  Center,
  Heading,

  SlideFade,
  useToast,
  VStack,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import Onboard from "bnc-onboard";
import EthCrypto from "eth-crypto";
import { ethers } from "ethers";
import { Environment, getStatusFleetNodes, StoreCodec, Waku, WakuMessage } from "js-waku";
import { Direction } from "js-waku/build/main/lib/waku_store/history_rpc";
import PeerId from "peer-id";
import React from "react";
import ChatBox from "./components/chatBox";
import WalletDisplay from "./components/walletDisplay";
import GlobalContext, { initialState, reducer } from "./context/globalContext";
import { formatAddress } from "./helpers/helpers";

let web3: ethers.providers.Web3Provider;

export const ChatContentTopic = "wakumono/dm";
export const AddressBroadcastTopic = "wakumono/broadcast";
function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const toast = useToast();

  const handleChatMessage = async (wakuMsg: WakuMessage) => {
    if (wakuMsg.payload && state.keys && state.reverseAddressBook) {
      try {
        const decryptedMessage = await EthCrypto.decryptWithPrivateKey(
          state.keys!.privateKey,
          EthCrypto.cipher.parse(wakuMsg.payloadAsUtf8)
        );
        const decryptedPayload = JSON.parse(decryptedMessage);
        const childKeyVer = EthCrypto.recoverPublicKey(
          decryptedPayload.childSig,
          EthCrypto.hash.keccak256(decryptedPayload.message)
        );
        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            from: state.reverseAddressBook[childKeyVer],
            message: decryptedPayload.message,
          },
        });
        toast({
          position: "bottom",
          title:
            "Message received from " +
            formatAddress(state.reverseAddressBook[childKeyVer]),
          description: decryptedPayload.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleHistoricalChatMessage = async (wakuMsg: WakuMessage) => {
    if (wakuMsg.payload && state.keys && state.reverseAddressBook) {
      try {
        const decryptedMessage = await EthCrypto.decryptWithPrivateKey(
          state.keys!.privateKey,
          EthCrypto.cipher.parse(wakuMsg.payloadAsUtf8)
        );
        const decryptedPayload = JSON.parse(decryptedMessage);
        const childKeyVer = EthCrypto.recoverPublicKey(
          decryptedPayload.childSig,
          EthCrypto.hash.keccak256(decryptedPayload.message)
        );
        dispatch({
          type: "ADD_MESSAGE",
          payload: {
            from: childKeyVer ?? "unknown sender",
            message: decryptedPayload.message,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleAddressBroadcastMessage = async (wakuMsg: WakuMessage) => {
    try {
      const msg = JSON.parse(wakuMsg.payloadAsUtf8);
      if (msg.chatKey) {
        if ((ethers.utils.verifyMessage(EthCrypto.publicKey.toAddress(msg.chatKey), msg.signature).toLowerCase() === msg.address.toLowerCase())) {
        dispatch({
          type: "ADD_PEER",
          payload: { [msg.address.toLowerCase()]: msg.chatKey },
        });
      }}
    } catch (err) {
      console.log(err);
    }
  };

  const handleProtocolChange = async (
    waku: Waku,
    { peerId, protocols }: { peerId: PeerId; protocols: string[] }
  ) => {
    if (protocols.includes(StoreCodec)) {
      try {
        const response = await waku.store.queryHistory({
          peerId: peerId,
          contentTopics: [AddressBroadcastTopic],
          direction: Direction.FORWARD,
        });
        if (response) {
          await response.map((wakuMsg) =>
            handleAddressBroadcastMessage(wakuMsg)
          );
        }
      } catch (e) {
        console.log(
          `${peerId.toB58String()}: error encountered when retrieving archived messages`,
          e
        );
      }
      try {
        const response = await waku.store.queryHistory({
          peerId: peerId,
          contentTopics: [ChatContentTopic],
        });
        if (response) {
          response.map((wakuMsg) => handleHistoricalChatMessage(wakuMsg));
        }
      } catch (e) {
        console.log(
          `${peerId.toB58String()}: error encountered when retrieving archived messages`,
          e
        );
      }
    }
  };

  const startWaku = async () => {
    try {
      const waku = await Waku.create({
        config: {
          pubsub: {
            enabled: true,
            emitSelf: true,
          },
        },
      });
/*
      waku.addPeerToAddressBook(
        "16Uiu2HAmPLe7Mzm8TsYUubgCAW1aJoeFScxrLj8ppHFivPo97bUZ",
        ["/dns4/node-01.do-ams3.jdev.misc.statusim.net/tcp/7010/wss"]
      );

      waku.addPeerToAddressBook(
        "16Uiu2HAmVkKntsECaYfefR1V2yCR79CegLATuTPE6B9TxgxBiiiA",
        [
          "/dns4/node-01.gc-us-central1-a.wakuv2.prod.statusim.net/tcp/443/wss/p2p/16Uiu2HAmVkKntsECaYfefR1V2yCR79CegLATuTPE6B9TxgxBiiiA",
        ]
      );
*/
      
      const nodes = await getStatusFleetNodes(Environment.Prod);
      await Promise.all(
        nodes.map((addr) => {
          return waku.dial(addr);
        })
      );

      dispatch({ type: "START_WAKU", payload: { waku: waku } });
      waku.relay.addObserver(handleChatMessage, [ChatContentTopic]);
      waku.relay.addObserver(handleAddressBroadcastMessage, [
        AddressBroadcastTopic,
      ]);
      waku.libp2p.peerStore.on(
        "change:protocols",
        handleProtocolChange.bind({}, waku)
      );
    } catch (e) {
      console.log("Issue starting waku ", e);
    }
  };

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
      AddressBroadcastTopic
    );
    state.waku?.relay.send(msg);
  };

  const handleConnect = async () => {
    const wallets = [
      { walletName: "metamask", preferred: true },
      { walletName: "status", preferred: true },
    ];
    const onboard = Onboard({
      networkId: 1,
      subscriptions: {
        wallet: async (wallet) => {
          try {
            web3 = new ethers.providers.Web3Provider(wallet.provider);
            dispatch({ type: "SET_WEB3", payload: { web3: web3 } });
            deriveChatKey();
          } catch (err) {
            console.log(err);
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

    dispatch({ type: "SET_ONBOARD", payload: { onboard: onboard } });
    try {
      await onboard.walletSelect();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GlobalContext.Provider value={{ dispatch, state }}>
      <Center h="90vh" mw="95vw">
        <VStack>
          <Heading>WakuMono</Heading>
          <Wrap justify="center" align="center" direction="row">
            <WrapItem>
              <WalletDisplay handleConnect={handleConnect} />
            </WrapItem>
            <WrapItem>
              <Button disabled={!state.keys} onClick={startWaku}>
                Connect to Waku
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                disabled={state.addressBook![state.address!] !== undefined}
                onClick={broadcastChatKey}
              >
                Broadcast Chatkey
              </Button>
            </WrapItem>
          </Wrap>
          <SlideFade in={state.waku !== undefined}>
            <ChatBox />
          </SlideFade>
        </VStack>
      </Center>
    </GlobalContext.Provider>
  );
}

export default App;
