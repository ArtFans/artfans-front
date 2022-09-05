import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from '../Loader';

import './styles.scss';

export const ArtInfiniteScroll = (
  {
    items = [],
    loadMore,
    children
  }: any
) => {
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={true}
      loader={<Loader />}
      scrollThreshold={1}
      className="art-infinite-scroll"
    >
      {children}
    </InfiniteScroll>
  );
};
