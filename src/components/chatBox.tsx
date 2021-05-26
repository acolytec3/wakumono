import {
  FormControl,
  FormErrorMessage,

  HStack,
  IconButton,
  Input,
  SlideFade,
  Text,
  VStack
} from "@chakra-ui/react";
import { WakuMessage } from "js-waku";
import React from "react";
import { BiMailSend } from "react-icons/bi";
import { ChatContentTopic } from "../App";
import GlobalContext, { message } from "../context/globalContext";
import { encryptMessage, formatAddress } from "../helpers/helpers";

const ChatBox = () => {
  const { state } = React.useContext(GlobalContext);
  const [messageList, setList] = React.useState<message[]>([]);
  const [msgText, setMsg] = React.useState("");
  const [toAddress, setTo] = React.useState("");

  React.useEffect(() => {
    const updatedList =
      state.messageList.length < 10
        ? state.messageList
        : state.messageList.slice(state.messageList.length - 11);
    setList(updatedList);
  }, [state.messageList]);

  const handleMessageSend = async (to: string, msgText: string) => {
    if (!state.web3 || !state.keys) {
      return;
    }

    if (!state.addressBook![to.toLowerCase()]) {
      console.log("no address found");
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
      <FormControl
        minHeight="100px"
        isInvalid={
          toAddress !== "" && state.addressBook![toAddress] === undefined
        }
      >
        <HStack>
          <Input
            value={toAddress}
            placeholder="Address"
            onChange={(evt) => setTo(evt.target.value)}
          />
          <Input
            value={msgText}
            placeholder="Enter a message"
            onChange={(evt) => setMsg(evt.target.value)}
          />
          <IconButton
            disabled={state.addressBook![toAddress.toLowerCase()] === undefined}
            onClick={() => {
              handleMessageSend(toAddress, msgText);
            }}
            aria-label="send message"
            icon={<BiMailSend />}
            variant="outline"
            colorScheme="blackAlpha"
          />
        </HStack>
        <SlideFade
          in={toAddress !== "" && state.addressBook![toAddress] === undefined}
        >
          <FormErrorMessage>Address not found</FormErrorMessage>
        </SlideFade>
      </FormControl>

      {messageList.map((msg: message) => {
        return (
          <HStack align="start" key={msg.from + Math.random().toFixed(10)}>
            <Text>
              {formatAddress(state.reverseAddressBook![msg.from])}:{" "}
              {msg.message}
            </Text>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default ChatBox;
