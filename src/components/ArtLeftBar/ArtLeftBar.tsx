import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '../Icon';

import { UserContext } from 'src/providers/UserProvider';

import './styles.scss';

export const ArtLeftBar = () => {
  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const { setLoggedIn, isLoggedIn, user } = useContext<any>(UserContext);

  const onLogout = () => {
    setLoggedIn(null);
    localStorage.removeItem('profile');
    window.open('/near/exit', '_self');
  };

  return (
    <div className="left-bar">
      <div
        className="left-bar__link left-bar__link--arrow"
        onClick={onScrollToTop}
      >
        <Icon name="arrow-up-circle" />
      </div>
      <NavLink to="/" className="left-bar__link">
        <Icon name="grid" />
      </NavLink>
      <NavLink to="/community" className="left-bar__link">
        <Icon name="users" />
      </NavLink>
      {/*<NavLink to="/messages" className="left-bar__link">*/}
      {/*  <Icon name="message-square" />*/}
      {/*</NavLink>*/}
      <NavLink to="/explore" className="left-bar__link">
        <Icon name="globe" />
      </NavLink>
      {isLoggedIn && (
        <>
          <NavLink to={`/profile/${user.id}`} className="left-bar__link">
            <Icon name="user" />
          </NavLink>
          <NavLink to="/settings/profile" className="left-bar__link">
            <Icon name="settings" />
          </NavLink>
          <div onClick={onLogout} className="left-bar__link">
            <Icon name="log-out" />
          </div>
        </>
      )}
    </div>
  );
};
