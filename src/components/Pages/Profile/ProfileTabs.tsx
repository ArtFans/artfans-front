import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ArtCard from 'src/components/ArtCard';
import ArtTitle from 'src/components/ArtTitle';
import Container from 'src/components/Container';
import Grid, { GridCell } from 'src/components/Grid';

export const ProfileTabs = ({ arts = [], collections = [] }: any) => {
  if (!arts.length && !collections.length) return null;
  console.log(arts);

  return (
    <div className="profile-page__tabs">
      <Tabs>
        <TabList>
          {!!arts.length && <Tab><ArtTitle>NFTS</ArtTitle></Tab>}
          {!!collections.length && <Tab><ArtTitle>Collections</ArtTitle></Tab>}
        </TabList>
        {!!arts.length && (
          <TabPanel>
            <Container>
              <Grid>
                {arts.map((item: any) => (
                  <GridCell
                    rows={4}
                    key={item._id}
                    className="profile-page__art"
                  >
                    <ArtCard {...item} />
                  </GridCell>
                ))}
              </Grid>
            </Container>
          </TabPanel>
        )}
        {!!collections.length && (
          <TabPanel>
            <Container>

            </Container>
          </TabPanel>
        )}
      </Tabs>
    </div>
  );
};
