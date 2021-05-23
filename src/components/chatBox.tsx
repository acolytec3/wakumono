import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import GlobalContext from "../context/globalContext";
import { formatAddress } from "../helpers/helpers";


const ChatBox = () => {
  const { state, dispatch } = React.useContext(GlobalContext);

  return (
    <Box>
     
    </Box>
  );
};

export default ChatBox;
