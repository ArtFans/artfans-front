import React from 'react';

import CommunityCard from '../CommunityCard';

const MockCommunityItem = (props: any) => (
  <CommunityCard
    id="kjofjsofjsd93jf"
    username="username"
    name="Klark Kent"
    collections={1}
    nfts={13}
    followers={341}
    {...props}
  />
);

export default MockCommunityItem;
