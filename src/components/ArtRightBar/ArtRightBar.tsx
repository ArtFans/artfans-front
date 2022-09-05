import React, {
  useContext,
  useCallback,
  useEffect,
  useState
} from 'react';

import ApiService from 'src/services/ApiService';

import Avatar from '../Avatar';
import FriendCard from '../FriendCard';
import ArtSlider from '../ArtSlider';
import ArtTitle from '../ArtTitle';

import { UserContext } from 'src/providers/UserProvider';

import './styles.scss';

export const ArtRightBar = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [peoples, setPeoples] = useState([]);
  const { user: { friends }, isLoggedIn } = useContext<any>(UserContext);

  const fetchPeoples = async () => {
    setPeoples(await ApiService.getRandomUsers());
    // setIsLoading(false);
  };

  useEffect(() => {
    fetchPeoples();
  }, []);

  if (!isLoggedIn) return null;

  return (
    <div className="right-bar">
      <div className="right-bar__section">
        <ArtTitle className="right-bar__title">
          You May Know Them
        </ArtTitle>
        <div className="right-bar__section-users">
          <ArtSlider>
            {peoples.map((item) => (
              <Avatar
                key={item}
                id={item}
                name={item}
                username={item}
                size="xl"
                className="right-bar__user"
              />
            ))}
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
