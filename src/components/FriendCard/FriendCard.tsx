import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../Avatar';
import Status from '../Status';
import NotificationBell from '../NotificationBell';

import './styles.scss';

export const FriendCard = (
  {
    id,
    name,
    username,
    lastSeen,
    isOnline = false,
    notifications = 0
  }: any
) => {
  return (
    <div className="friend-card">
      <Avatar id={id} name={name} size="lg" />
      <Link to={`/profile/${id}`} className="friend-card__username">
        {username}
      </Link>
      {lastSeen && (
        <div className="friend-card__status">
          {!!notifications && <NotificationBell type="sm" count={notifications} />}
          <Status isOnline={isOnline} lastSeen={lastSeen} />
        </div>
      )}
    </div>
  );
};
