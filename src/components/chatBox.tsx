import React from "react";
import {
  Button,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
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
    setList(state.messageList);
  }, [state.messageList]);

  const handleMessageSend = async (to: string, msgText: string) => {
    if (!state.web3 || !state.keys) {
      return;
    }
    const encryptedMessage = await encryptMessage(
      state.keys,
      state.addressBook![to.toLowerCase()],
      msgText,
    );
    const msg = WakuMessage.fromUtf8String(encryptedMessage, ChatContentTopic);
    state.waku?.relay.send(msg);
    setMsg('');
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
          onClick={() => {
            handleMessageSend(toAddress, msgText);
          }}
        >
          Send Message
        </Button>
      </HStack>

      {messageList.map((msg: message) => {
        return (
          <HStack key={msg.from+Math.random()}>
            <Text>
              {formatAddress(msg.from)}: {msg.message}
            </Text>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default ChatBox;
