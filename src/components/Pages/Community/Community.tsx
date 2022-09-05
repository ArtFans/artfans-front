import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ArtTitle from 'src/components/ArtTitle';
import Container from 'src/components/Container';
import Grid, { GridCell } from 'src/components/Grid';
import CommunityCard from 'src/components/CommunityCard';

import { UserContext } from 'src/providers/UserProvider';

import './styles.scss';

export const Community = () => {
  const { user: { friends } } = useContext<any>(UserContext);

  return (
    <div className="community-page">
      <Tabs>
        <TabList>
          <Tab>
            <ArtTitle>{friends.length} Following</ArtTitle>
          </Tab>
          <Tab>
            <ArtTitle>Most Popular</ArtTitle>
          </Tab>
          <Tab>
            <ArtTitle>People you might like</ArtTitle>
          </Tab>
        </TabList>
        <TabPanel>
          <Container>
            <Grid>
              {friends.map((friend: any) => (
                <GridCell rows={6} className="community-page__user">
                  <CommunityCard
                    key={friend}
                    id={friend}
                    name={friend}
                    isFollowing={true}
                  />
                </GridCell>
              ))}
            </Grid>
          </Container>
        </TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </div>
  );
};
