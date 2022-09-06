import React from 'react';

import Icon from 'src/components/Icon';

import cover from 'src/assets/img/cover.png';

export const ProfileBanner = ({ url, isMe = true }: any) => (
  <div
    style={{ backgroundImage: `url(${url ? url : cover})` }}
    className="profile-page__banner"
  >
    {/*{isMe && (*/}
    {/*  <Icon className="profile-page__banner-edit" name="image" isRound={true} />*/}
    {/*)}*/}
  </div>
);
