import React from "react";
import { Button, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import GlobalContext, { message } from "../context/globalContext";
import { encryptMessage, formatAddress } from "../helpers/helpers";
import { ChatContentTopic } from "../App";
import { WakuMessage } from "js-waku";

const ChatBox = () => {
  const { state, dispatch } = React.useContext(GlobalContext);
  const [messageList, setList] = React.useState<message[]>([]);
  const [msgText, setMsg] = React.useState("");
  const [toAddress, setTo] = React.useState("");

  React.useEffect(() => {
    const updatedList = state.messageList.length < 10 ? state.messageList : state.messageList.slice(state.messageList.length - 11)
    setList(updatedList);
  }, [state.messageList]);

  const handleMessageSend = async (to: string, msgText: string) => {
    if (!state.web3 || !state.keys) {
      return;
    }

    if (!state.addressBook![to.toLowerCase()]) {
      console.log('no address found');
      return;
    }
    const encryptedMessage = await encryptMessage(
      state.keys,
      state.addressBook![to.toLowerCase()],
      msgText
    );
    const msg = WakuMessage.fromUtf8String(encryptedMessage, ChatContentTopic);
    state.waku?.relay.send(msg);
    setMsg("");
  };

  return (
    <VStack>
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
          minWidth="150px"
          onClick={() => {
            handleMessageSend(toAddress, msgText);
          }}
        >
          Send Message
        </Button>
      </HStack>

      {messageList.map((msg: message) => {
        return (
          <HStack align="start" key={msg.from + Math.random().toFixed(10)}>
            <Text>
              {formatAddress(state.reverseAddressBook![msg.from])}: {msg.message}
            </Text>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default ChatBox;
