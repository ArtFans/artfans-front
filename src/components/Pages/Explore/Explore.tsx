import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import fakeArt from 'src/helpers/fakeArt';

import ApiService from 'src/services/ApiService';

import TBA from 'src/components/TBA';
import Container from 'src/components/Container';
import ArtCard from 'src/components/ArtCard';
import ArtTitle from 'src/components/ArtTitle';
import Grid, { GridCell } from 'src/components/Grid';
import ArtInfiniteScroll from 'src/components/ArtInfiniteScroll';

import { UserContext } from 'src/providers/UserProvider';

import './styles.scss';

export const Explore = () => {
  const [friendsArts, setFriendsArts] = useState<any>([]);
  const { user: { friends }, isLoggedIn } = useContext<any>(UserContext);

  const fetchFriendsArts = useCallback(async () => {
    const arts = await ApiService.getFriendsArts({
      friends,
      skip: friendsArts.length
    });

    setFriendsArts((state: any) => [...state, ...arts]);
  }, [friends, friendsArts]);

  useEffect(() => {
    fetchFriendsArts();
  }, [friends])

  return (
    <Tabs className="explore-page">
      <TabList>
        {isLoggedIn && (
          <Tab>
            <ArtTitle>Friends feed</ArtTitle>
          </Tab>
        )}
        <Tab>
          <ArtTitle>Trending searches</ArtTitle>
        </Tab>
        <Tab>
          <ArtTitle>Popular collections</ArtTitle>
        </Tab>
        <Tab>
          <ArtTitle>NFTs you might like</ArtTitle>
        </Tab>
      </TabList>
      {isLoggedIn && (
        <TabPanel>
          <Container>
            {friends.length ? (
              <ArtInfiniteScroll items={friendsArts} loadMore={fetchFriendsArts}>
                <Grid>
                  {friendsArts.map((art: any) => (
                    <GridCell key={art._id}>
                      <ArtCard {...art} />
                    </GridCell>
                  ))}
                </Grid>
              </ArtInfiniteScroll>
            ) : (
              <div className="explore-page__empty">
                You don't have any friends :(
              </div>
            )}
          </Container>
        </TabPanel>
      )}
      <TabPanel>
        <Container className="explore-page__container">
          <TBA />
          <Grid>
            {[...Array(10)].map(((item, index) => (
              <GridCell key={index}>
                <ArtCard {...fakeArt()} />
              </GridCell>
            )))}
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel>
        <Container className="explore-page__container">
          <TBA />
          <Grid>
            {[...Array(10)].map(((item, index) => (
              <GridCell key={index}>
                <ArtCard {...fakeArt()} />
              </GridCell>
            )))}
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel>
        <Container className="explore-page__container">
          <TBA />
          <Grid>
            {[...Array(10)].map(((item, index) => (
              <GridCell key={index}>
                <ArtCard {...fakeArt()} />
              </GridCell>
            )))}
          </Grid>
        </Container>
      </TabPanel>
    </Tabs>
  )
};
