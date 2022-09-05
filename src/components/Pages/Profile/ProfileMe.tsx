import React from 'react';

import ArtButton from 'src/components/ArtButton';
import Container from 'src/components/Container';
import { ProfileBanner } from './ProfileBanner';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileWho } from './ProfileWho';
import { ProfileInfo } from './ProfileInfo';
import { ProfileSocials } from './ProfileSocials';
import { ProfileStats } from './ProfileStats';
import { ProfileTabs } from './ProfileTabs';

export const ProfileMe = ({ user }: any) => {
  const { id, profile, artsCount } = user;

  return (
    <div className="profile-page">
      <ProfileBanner
        url="https://upload.wikimedia.org/wikipedia/commons/6/6c/Herjangsfjorden_%26_Ofotfjorden%2C_wide%2C_2009_09.jpg"
      />
      <div className="profile-page__header">
        <ProfileAvatar url={profile.image} />
        <div className="profile-page__user">
          <ProfileWho id={id} name={profile.name} />
          <ArtButton
            to="/settings/profile"
            className="profile-page__header-button"
          >
            Edit
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
          <ProfileStats nfts={artsCount} />
        </Container>
        <ProfileTabs id={id} />
      </div>
    </div>
  );
};