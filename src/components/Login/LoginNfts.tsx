import React from 'react';

import ArtButton from '../ArtButton';

export const LoginNfts = ({ onNext }: any) => {
  return (
    <>
      <div className="login__body">
        <h1 className="login__title">
          We have found 10050 NFTs in your wallet!
        </h1>
        Show them all in your profile!
      </div>
      <div className="login__footer">
        <ArtButton onClick={onNext}>Next</ArtButton>
      </div>
    </>
  );
};
