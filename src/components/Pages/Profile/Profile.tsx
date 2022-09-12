import React, { useMemo, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { UserContext } from 'src/providers/UserProvider';

import { ProfileMe } from './ProfileMe';
import { ProfileThey } from './ProfileThey';

import './styles.scss';

export const Profile = () => {
  const { id } = useParams();
  const { user, fetchMyArts } = useContext<any>(UserContext);

  const isMe = useMemo(() => !id || id === user.id, [id, user.id]);

  return isMe ?
    <ProfileMe user={user} fetchMyArts={fetchMyArts} /> :
    <ProfileThey id={id} />;
};
