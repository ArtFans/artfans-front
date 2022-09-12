import React, { useCallback, useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ApiService from 'src/services/ApiService';

import ArtCard from 'src/components/ArtCard';
import ArtTitle from 'src/components/ArtTitle';
import Container from 'src/components/Container';
import Grid, { GridCell } from 'src/components/Grid';
import ArtInfiniteScroll from 'src/components/ArtInfiniteScroll';

export const ProfileTabs = ({ id, predefinedArts, fetchMyArts }: any) => {
  const collections = [];
  const [arts, setArts] = useState<any>(predefinedArts);

  const fetchArts = useCallback(async () => {
    if (fetchMyArts) {
      await fetchMyArts();
    } else {
      const result = await ApiService.getFriendsArts({
        friends: [id],
        skip: arts.length
      });

      setArts((state: any) => [...state, ...result]);
    }
  }, [id, arts, fetchMyArts]);

  useEffect(() => {
    if (!predefinedArts) {
      fetchArts();
    }
  }, [predefinedArts]);

  if (!arts.length && !collections.length) return null;

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
              <ArtInfiniteScroll items={arts} loadMore={fetchArts}>
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
              </ArtInfiniteScroll>
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
