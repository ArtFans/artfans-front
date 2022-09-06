import React, { useContext } from 'react';

import ArtButton from '../ArtButton';

import { UserContext } from 'src/providers/UserProvider';

export const LoginNfts = ({ onNext }: any) => {
  const { user: { artsCount } } = useContext<any>(UserContext);

  return (
    <>
      <div className="login__body">
        <h1 className="login__title">
          We have found {artsCount} NFTs in your wallet!
        </h1>
        {!!artsCount && 'Show them all in your profile!'}
      </div>
      <div className="login__footer">
        <ArtButton onClick={onNext}>Next</ArtButton>
      </div>
    </>
  );
};
