import React, { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Loader from '../Loader';

import './styles.scss';

export const ArtInfiniteScroll = (
  {
    items = [],
    loadMore,
    children,
    limit = 15
  }: any
) => {
  const hasMore = useMemo(
    () => (items.length / limit) % 1 === 0, [items.length, limit]
  );

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<Loader />}
      scrollThreshold={1}
      className="art-infinite-scroll"
    >
      {children}
    </InfiniteScroll>
  );
};
