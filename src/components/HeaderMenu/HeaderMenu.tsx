import React from 'react';

// import ArtButton from '../ArtButton';
// import Icon from '../Icon';
import Notifications from '../Notifications';
import { HeaderMenuUser } from './HeaderMenuUser';

import './styles.scss';

export const HeaderMenu = () => (
  <div className="header-menu">
    {/*<ArtButton icon="plus" className="header__button">*/}
    {/*  Create nft*/}
    {/*</ArtButton>*/}
    <div className="header-menu__nav">
      {/*<Icon name="search" className="header-menu__nav-item header-menu__icon" />*/}
      <div className="header-menu__nav-item">
        <Notifications />
      </div>
      <HeaderMenuUser />
    </div>
  </div>
);
