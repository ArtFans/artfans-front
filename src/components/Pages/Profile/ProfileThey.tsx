import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  useMemo
} from 'react';
import cx from 'classnames';

import NearService from 'src/services/NearService';

import ArtButton from 'src/components/ArtButton';
import Container from 'src/components/Container';
import { ProfileBanner } from './ProfileBanner';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileWho } from './ProfileWho';
import { ProfileInfo } from './ProfileInfo';
import { ProfileSocials } from './ProfileSocials';
import { ProfileStats } from './ProfileStats';
import { ProfileTabs } from './ProfileTabs';

import { UserContext } from 'src/providers/UserProvider';

export const ProfileThey = ({ id }: any) => {
  const [isPageLoading, setPageLoading] = useState(true);
  const [isFriendAdding, setFriendAdding] = useState(false);
  const [profile, setProfile] = useState<any>({});

  const { addFriend, user: { friends } } = useContext<any>(UserContext);

  const isFriend = useMemo(() => (
    friends.some((item: any) => item === id)
  ), [id, friends]);

  const fetchUser = useCallback(async () => {
    setPageLoading(true);
    setProfile({});
    try {
      const result = await NearService.contract.get_profile({
        account_id: id
      });

      if (result) {
        const { image, json_metadata } = result;
        const profileData = {
          image,
          ...JSON.parse(json_metadata)
        };

        setProfile((state: any) => ({
          ...state,
          ...profileData
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPageLoading(false);
    }
  }, [id]);

  const onFollow = useCallback(async () => {
    setFriendAdding(true);
    try {
      if (!isFriend) {
        await NearService.contract.add_friend({
          friend_id: id
        });

        addFriend(id);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setFriendAdding(false);
    }
  }, [id, addFriend, isFriend]);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const followBtn = cx(
    'profile-page__header-button',
    { 'profile-page__header-button--following': isFriend }
  );

  if (isPageLoading) return null;

  return (
    <div className="profile-page">
      <ProfileBanner
        isMe={false}
        url=""
      />
      <div className="profile-page__header">
        <ProfileAvatar url={profile.image} />
        <div className="profile-page__user">
          <ProfileWho id={id} name={profile.name} />
          <ArtButton
            as="button"
            onClick={onFollow}
            loading={isFriendAdding}
            className={followBtn}
          >
            Follow{isFriend ? 'ing' : ''}
          </ArtButton>
        </div>
      </div>
      <div className="profile-page__content">
        <Container className="profile-page__about">
          <ProfileInfo
            bio={profile.bio}
            age={profile.age}
          />
          <ProfileSocials
            socials={{
              instagram: profile.instagram,
              twitter: profile.twitter,
              youtube: profile.youtube,
              github: profile.github
            }}
          />
          <ProfileStats />
        </Container>
        <ProfileTabs id={id} />
      </div>
    </div>
  );
};
