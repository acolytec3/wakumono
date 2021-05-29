import {
  Box,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  IconButton,
  Input,
  SlideFade,
  VStack,
  Text,
  Tooltip
} from "@chakra-ui/react";
import { WakuMessage } from "js-waku";
import React from "react";
import { BiMailSend } from "react-icons/bi";
//@ts-ignore
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { ChatContentTopic } from "../App";
import GlobalContext, { message } from "../context/globalContext";
import { encryptMessage, formatAddress } from "../helpers/helpers";

const ChatBox = () => {
  const { state } = React.useContext(GlobalContext);
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
    <VStack mw="90vw">
      <FormControl /* @ts-ignore */ 
      sx={{ position: '-webkit-sticky', /* Safari */ position: 'sticky', top: '5px' }}
        minHeight="100px"
        isInvalid={
          toAddress !== "" && state.addressBook![toAddress] === undefined
        }
      > 
        <HStack  bg="white" opacity="1">
          <Input maxWidth="30vw"
            value={toAddress}
            placeholder="Address"
            onChange={(evt) => setTo(evt.target.value)}
          />
          <Input minWidth="30vw"
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
          in={toAddress !== "" && state.addressBook![toAddress.toLowerCase()] === undefined}
        >
          <FormErrorMessage>Address not found</FormErrorMessage>
        </SlideFade>
      </FormControl>

      <Heading>Inbox</Heading>
      <HStack w="75vw" spacing="24px">
        <Box fontWeight="bold" w="150px">
          Sender
        </Box>
        <Box fontWeight="bold">Message</Box>
      </HStack>{/*@ts-ignore */}
      <VStack sx={{overflow: "scroll"}} maxHeight="100vh">
      {messageList.map((msg: message) => {
        return (
          <HStack key={msg.from+Math.random()} w="75vw" spacing="24px">
            <HStack w="150px">
              {msg.from && <Jazzicon diameter={20} seed={jsNumberForAddress(msg.from)} />}
              <Tooltip hasArrow label="Click to copy" aria-label="copy">
                <Text cursor="pointer" onClick={() => navigator.clipboard.writeText(state.reverseAddressBook![msg.from])}>{formatAddress(state.reverseAddressBook![msg.from])}</Text>
              </Tooltip>
            </HStack>
            <Box>{msg.message}</Box>
          </HStack>
        );
      })}</VStack>
    </VStack>
  );
};

export default ChatBox;
