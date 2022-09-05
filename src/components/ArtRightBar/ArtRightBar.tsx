import React, { useContext } from 'react';

import Avatar from '../Avatar';
import FriendCard from '../FriendCard';
import ArtSlider from '../ArtSlider';
import ArtTitle from '../ArtTitle';

import { UserContext } from 'src/providers/UserProvider';

import './styles.scss';

export const ArtRightBar = () => {
  const { user: { friends } } = useContext<any>(UserContext);

  if (!friends.length) return null;

  return (
    <div className="right-bar">
      <div className="right-bar__section">
        <ArtTitle className="right-bar__title">
          You May Know Them
        </ArtTitle>
        <div className="right-bar__section-users">
          <ArtSlider>
            <Avatar
              id="4ro34roi34j"
              name="Peter Parker"
              username="spider.man"
              size="xl"
              className="right-bar__user"
            />
            <Avatar
              id="84yf8gh3874hh"
              name="Zohan Wills"
              username="zohan"
              size="xl"
              className="right-bar__user"
            />
            <Avatar
              id="ojvf89yeh9f"
              name="Recardo Pedro"
              username="johndoe"
              size="xl"
              className="right-bar__user"
            />
            <Avatar
              id="8uf9djfsojnfls"
              name="William Will"
              username="will.william"
              size="xl"
              className="right-bar__user"
            />
          </ArtSlider>
        </div>
      </div>
      <div className="right-bar__section">
        <ArtTitle className="right-bar__title">
          Friends
        </ArtTitle>
        <div className="right-bar__section-friends">
          {friends.map((friend: any) => (
            <FriendCard
              id={friend}
              name={friend}
              username={friend}
              key={friend}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
