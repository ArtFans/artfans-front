import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from 'src/components/Icon';

export const SettingsNav = () => (
  <div className="settings-page__nav">
    <NavLink to="/settings/profile" className="settings-page__link">
      Edit Profile
      <Icon name="chevron-right" />
    </NavLink>
    <NavLink to="/settings/my-nfts" className="settings-page__link">
      My NFTs
      <Icon name="chevron-right" />
    </NavLink>
    <NavLink to="/settings/my-collections" className="settings-page__link">
      My Collections
      <Icon name="chevron-right" />
    </NavLink>
    <NavLink to="/settings/password" className="settings-page__link">
      Password
      <Icon name="chevron-right" />
    </NavLink>
  </div>
);
