import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../Icon';

const notificationTypes: any = {
  like: {
    icon: 'heart',
    title: 'New Like!',
    tagline: 'liked your NFT'
  },
  follower: {
    icon: 'user-plus',
    title: 'New Follower!',
    tagline: 'now followed you'
  },
  comment: {
    icon: 'message-square',
    title: 'New Comment!',
    tagline: 'commented your NFT'
  },
  created: {
    icon: 'plus-circle',
    title: 'New NFT created!',
    tagline: 'created new NFT'
  },
  buyed: {
    icon: 'shopping-cart',
    title: 'NFT buyed!',
    tagline: 'buyed NFT'
  },
  popular: {
    icon: 'thumbs-up',
    title: 'Your NFT is popular'
  }
};

export const NotificationsItem = ({ type, user }: any) => {
  if (!type) return null;

  return (
    <div className="notifications__item">
      <Icon
        size="sm"
        className="notifications__item-icon"
        name={notificationTypes[type].icon}
      />
      <div className="notifications__item-content">
        <div className="notifications__item-title">
          {notificationTypes[type].title}
        </div>
        {notificationTypes[type].tagline && (
          <div className="notifications__item-tagline">
            <Link to="/">{user}</Link> {notificationTypes[type].tagline}
          </div>
        )}
      </div>
    </div>
  );
};
