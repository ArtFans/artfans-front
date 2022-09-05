import React, { useContext } from 'react';
import BigNumber from 'bignumber.js';

import formatNumber from 'src/helpers/formatNumber';

import ArtButton from 'src/components/ArtButton';

import { UserContext } from 'src/providers/UserProvider';

export const ArtBuy = ({ price }: any) => {
  const { currency } = useContext<any>(UserContext);

  return (
    <ArtButton className="art-page__buy" size="small">
      <span>Buy {formatNumber(price)}N</span>
      <span className="art-page__usd">
        ${formatNumber(new BigNumber(price).dividedBy(new BigNumber(currency)))}
      </span>
    </ArtButton>
  );
};
