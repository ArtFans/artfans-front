import React, { useMemo } from 'react';
import cx from 'classnames';

import Container from 'src/components/Container';
import ArtTitle from 'src/components/ArtTitle';
import ArtButton from 'src/components/ArtButton';
import ArtCard from 'src/components/ArtCard';
import Grid, { GridCell } from 'src/components/Grid';

export const ArtOtherNft = ({ ownerId, arts = [], forDesktop = true }: any) => {
  const containerClass = cx(
    'art-page__other-nfts',
    { 'art-page__other-nfts--mobile': !forDesktop }
  );

  const displayItems = useMemo(() => {
    return arts.filter((_art: any, index: number) => index <= 11)
  }, [arts]);

  if (!arts.length) return null;

  return (
    <div className={containerClass}>
      <Container>
        <ArtTitle className="art-page__title">
          Other Arts from owner
        </ArtTitle>
        <Grid>
          {displayItems.map((item: any) => (
            <GridCell
              rows={3}
              key={item._id}
              className="art-page__other-nft"
            >
              <ArtCard {...item} isTiny={true} />
            </GridCell>
          ))}
        </Grid>
      </Container>
      {arts.length > displayItems.length && (
        <ArtButton
          to={`/profile/${ownerId}`}
          size="small"
          className="art-page__other-nft-btn"
        >
          View all arts
        </ArtButton>
      )}
    </div>
  );
};
