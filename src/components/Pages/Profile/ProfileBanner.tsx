import React from 'react';

import Icon from 'src/components/Icon';

export const ProfileBanner = ({ url, isMe = true }: any) => (
  <div
    style={{ backgroundImage: `url(${url})` }}
    className="profile-page__banner"
  >
    {isMe && (
      <Icon className="profile-page__banner-edit" name="image" isRound={true} />
    )}
  </div>
);
