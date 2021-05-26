import React from "react";
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Heading,
  VStack,
} from "@chakra-ui/react";
import GlobalContext from "../context/globalContext";
import { formatAddress } from "../helpers/helpers";

type WalletProps = {
  handleConnect: () => void;
};

const WalletDisplay: React.FC<WalletProps> = ({ handleConnect }) => {
  const { state, dispatch } = React.useContext(GlobalContext);

  const handleClick = () => {
    if (state.onboard) {
      state.onboard.walletReset();
      dispatch({ type: "SET_ADDRESS", payload: { address: undefined } });
      dispatch({ type: "SET_WEB3", payload: { web3: undefined } });
    }
  };

  return (
    <Box>
      {state.address ? (
        <Popover placement="top">
          <PopoverTrigger>
            <Button w="200px">
              {formatAddress(state.address)}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Heading size="sm">Wallet Details</Heading>
            </PopoverHeader>
            <PopoverBody>
              <VStack>
                <Button onClick={handleClick}>Disconnect Wallet</Button>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Button w="200px" onClick={handleConnect}>
          Connect Web3
        </Button>
      )}
    </Box>
  );
};

export default WalletDisplay;
