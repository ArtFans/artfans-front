import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Container from 'src/components/Container';
import ArtTitle from 'src/components/ArtTitle';
import Grid, { GridCell } from 'src/components/Grid';

// Mock
import MockNftItem from 'src/components/Mock/MockNftItem';

import './styles.scss';

export const Explore = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>
          <ArtTitle>Friends feed</ArtTitle>
        </Tab>
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
      <TabPanel>
        <Container>
          <Grid>
            {[...Array(8)].map((item, index) => (
              <GridCell key={index + Math.random()}>
                <MockNftItem />
              </GridCell>
            ))}
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel>
        <Container>
          <Grid>
            {[...Array(2)].map((item, index) => (
              <GridCell key={index + Math.random()}>
                <MockNftItem />
              </GridCell>
            ))}
          </Grid>
        </Container>
      </TabPanel>
      <TabPanel></TabPanel>
      <TabPanel></TabPanel>
    </Tabs>
  )
};
