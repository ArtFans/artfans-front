import React from 'react';

import Grid, { GridCell } from 'src/components/Grid';
import Stat from 'src/components/Stat';

export const ProfileStats = (
  {
    followers,
    following,
    nfts,
    collections,
    cost
  }: any
) => (
  <div className="profile-page__stats">
    <Grid>
      {!!followers && (
        <GridCell rows={2}>
          <Stat value={followers} name="Followers" />
        </GridCell>
      )}
      {!!following && (
        <GridCell rows={2}>
          <Stat value={following} name="Following" />
        </GridCell>
      )}
      {!!nfts && (
        <GridCell rows={2}>
          <Stat value={nfts} name="NFTs" />
        </GridCell>
      )}
      {!!collections && (
        <GridCell rows={2}>
          <Stat value={collections} name="Collections" />
        </GridCell>
      )}
    </Grid>
    {cost && <Stat prefix="$ " value={cost} name="NFTs Total Cost" />}
  </div>
);
