import React, { useState } from 'react';

import TBA from '../TBA';
import NotificationBell from '../NotificationBell';
import Dropdown from '../Dropdown';
import { NotificationsItem } from './NotificationsItem';

import './styles.scss';

export const Notifications = () => {
  const notificationsCount = 0;
  const [dropdownVisible, setVisibility] = useState(false);

  return (
    <div className="notifications">
      <NotificationBell
        count={notificationsCount}
        onClick={() => setVisibility(!dropdownVisible)}
      />
      <Dropdown
        className="notifications__dropdown"
        open={dropdownVisible}
        onClickOutside={() => setVisibility(!dropdownVisible)}
      >
        <TBA />
        <NotificationsItem type="like" user="bob" />
        <NotificationsItem type="follower" user="bob" />
        <NotificationsItem type="comment" user="John Doe" />
        <NotificationsItem type="created" user="bob" />
        <NotificationsItem type="buyed" user="bob" />
        <NotificationsItem type="popular" user="bob" />
      </Dropdown>
    </div>
  );
};
