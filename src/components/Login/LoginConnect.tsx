import React from 'react';

import { ethers } from "ethers";
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import Web3Login from "./Web3Login";


function getLibrary(provider) {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
}

export const LoginConnect = () => {
  return (
    <>
      <div className="login__body">
        <h1 className="login__title">
          Connect you wallet
        </h1>
        It'll help us to expose your NFTs to the world!
      </div>
      <div className="login__footer">
          <Web3ReactProvider getLibrary={getLibrary}>
              <Web3Login />
          </Web3ReactProvider>
      </div>
    </>
  );
};
