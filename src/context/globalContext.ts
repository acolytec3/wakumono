
import { ethers } from 'ethers'

import React from 'react'
import { Waku } from 'js-waku';
import crypto from 'libp2p-crypto';

export type globalState = {
    web3?: ethers.providers.Web3Provider,
    address?: string,
    onboard?: any,
    waku?: Waku,
    keys?: crypto.keys.supportedKeys.rsa.RsaPrivateKey,
    addressBook?: {
      [key: string]: string
    }
  }
  
  export const initialState = {
    addressBook: {}
  }
  
  
  export const reducer = (state: globalState, action: any): globalState => {
    switch (action.type) {
      case 'SET_WEB3': {
        return { ...state, web3: action.payload.web3 };
      }
      case 'START_WAKU': {
        return { ...state, waku: action.payload.waku };
      }
      case 'SET_ADDRESS': {
        return { ...state, address: action.payload.address };
      }
      case 'SET_ONBOARD': {
        return { ...state, onboard: action.payload.onboard };
      }
      case 'SET_KEYS': {
        return { ...state, keys: action.payload.keys };
      }
      case 'ADD_PEER': {
        return {...state, addressBook: Object.assign(state.addressBook, action.payload)}
      }
      default:
        return state;
    }
  }

  const GlobalContext = React.createContext<{state:globalState, dispatch: React.Dispatch<any>}>({state: initialState, dispatch: () => null})

  export { GlobalContext as default } 