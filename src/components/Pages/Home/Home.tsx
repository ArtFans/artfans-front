import React, { useEffect, useCallback, useState } from 'react';

import Loader from 'src/components/Loader';
import ArtInfiniteScroll from 'src/components/ArtInfiniteScroll';
import ArtCard from 'src/components/ArtCard';
import Grid, { GridCell } from 'src/components/Grid';
import Container from 'src/components/Container';

import ApiService from 'src/services/ApiService';

import './styles.scss';

export const Home = () => {
  const [arts, setArts] = useState<any>([]);

  const fetchArts = useCallback(async () => {
    const result = await ApiService.getLastArts({ skip: arts.length });
    setArts((state: any) => [...state, ...result]);
  }, [arts]);

  useEffect(() => {
    fetchArts();
  }, []);

  return !arts.length ? <Loader /> : (
    <Container className="container__home">
      <ArtInfiniteScroll items={arts} loadMore={fetchArts}>
        <Grid>
          {arts.map((item: any) => (
            <GridCell key={item._id}>
              <ArtCard {...item} />
            </GridCell>
          ))}
        </Grid>
      </ArtInfiniteScroll>
    </Container>
  );
};
