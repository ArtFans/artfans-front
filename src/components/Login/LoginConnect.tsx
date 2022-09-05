import React from 'react';

import ArtButton from '../ArtButton';

export const LoginConnect = () => {
  const onLogin = (event: Event) => {
    event.preventDefault();
    window.open('/near/auth', '_self');
  }

  return (
    <>
      <div className="login__body">
        <h1 className="login__title">
          Connect you NEAR wallet
        </h1>
        It'll help us to expose your NFTs to the world!
      </div>
      <div className="login__footer">
        <ArtButton onClick={onLogin}>Connect wallet</ArtButton>
      </div>
    </>
  );
};
