import React, { useState, useCallback } from 'react';
import BigNumber from 'bignumber.js';

import NearService from 'src/services/NearService';

import formatNumber from 'src/helpers/formatNumber';

import ArtButton from '../ArtButton';
import ArtTitle from '../ArtTitle';
import ArtInput from '../ArtInput';
import Grid, { GridCell } from '../Grid';

import './styles.scss';

export const BuyTokens = () => {
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState<number>(100);

  const onBuyTokens = useCallback(async () => {
    setLoading(true);
    try {
      const amount = new BigNumber(value)
        .shiftedBy(24)
        .toFormat()
        .split(',')
        .join('');

      await NearService.buyArtTokes(amount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [value]);

  return (
    <div className="buy-tokens">
      <ArtTitle className="buy-tokens__title">
        Buy ArtFans Action Tokens
      </ArtTitle>
      <div className="buy-tokens__currency">
        <Grid>
          <GridCell rows={2}>
            <ArtInput
              className="buy-tokens__input"
              type="number"
              min={0}
              placeholder="amount"
              defaultValue={value}
              onChange={({ currentTarget }: any) => setValue(currentTarget.value)}
            />
          </GridCell>
          <GridCell rows={2} className="">
            {formatNumber(value / 100)}N
          </GridCell>
        </Grid>
      </div>
      <ArtButton
        as="button"
        size="small"
        className="buy-tokens__button"
        onClick={onBuyTokens}
        loading={isLoading}
      >
        Buy
      </ArtButton>
    </div>
  );
};
