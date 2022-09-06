import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import fakeUser from 'src/helpers/fakeUser';

import TBA from 'src/components/TBA';
import ArtTitle from 'src/components/ArtTitle';
import Container from 'src/components/Container';
import Grid, { GridCell } from 'src/components/Grid';
import CommunityCard from 'src/components/CommunityCard';

import { UserContext } from 'src/providers/UserProvider';

import './styles.scss';

export const Community = () => {
  const { user: { friends }, isLoggedIn } = useContext<any>(UserContext);

  return (
    <Tabs className="community-page">
      <TabList>
        {isLoggedIn && (
          <Tab>
            <ArtTitle>{friends.length} Following</ArtTitle>
          </Tab>
        )}
        <Tab>
          <ArtTitle>Most Popular</ArtTitle>
        </Tab>
        <Tab>
          <ArtTitle>People you might like</ArtTitle>
        </Tab>
      </TabList>
      {isLoggedIn && (
        <TabPanel>
          <Container>
            <Grid>
              {friends.map((friend: any) => (
                <GridCell key={friend} rows={6} className="community-page__user">
                  <CommunityCard
                    id={friend}
                    name={friend}
                    isFollowing={true}
                  />
                </GridCell>
              ))}
            </Grid>
          </Container>
        </TabPanel>
      )}
      <TabPanel>
        <Container className="community-page__container">
          <TBA />
          <Grid>
            {[...Array(18)].map(((item, index) => (
              <GridCell key={index} rows={6} className="community-page__user">
                <CommunityCard {...fakeUser()} />
              </GridCell>
            )))}
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel>
        <Container className="community-page__container">
          <TBA />
          <Grid>
            {[...Array(18)].map(((item, index) => (
              <GridCell key={index} rows={6} className="community-page__user">
                <CommunityCard {...fakeUser()} />
              </GridCell>
            )))}
          </Grid>
        </Container>
      </TabPanel>
    </Tabs>
  );
};
