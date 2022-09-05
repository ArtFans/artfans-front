import React from 'react';

import ArtCard from '../ArtCard';

const MockNftItem = (props: any) => (
  <ArtCard
    id="62f65e5e8940c40d0306f8ae"
    media="https://api.therealbirds.com/metadata/995.png"
    owner={{
      id: '798df7sdfs9df7sd9f7s9',
      username: 'realbirds.near',
      name: 'Tom Raddle'
    }}
    likes={0}
    liked={false}
    issuedAt={1660313178158}
    {...props}
  />
);

export default MockNftItem;
