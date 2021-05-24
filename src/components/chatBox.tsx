import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import GlobalContext, { message } from "../context/globalContext";
import { formatAddress } from "../helpers/helpers";


const ChatBox = () => {
  const { state, dispatch } = React.useContext(GlobalContext);
  const [messageList, setList] = React.useState<message[]>([]);

  React.useEffect(() => {
    setList(state.messageList);
  },[state.messageList]);

  return (
    <VStack>
     {messageList.map((msg: message) => {
       return (<HStack>
         <Text>{formatAddress(msg.from)}: {msg.message}</Text>
       </HStack>)
     })}
    </VStack>
  );
};

export default ChatBox;
