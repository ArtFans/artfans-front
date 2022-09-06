import React from 'react';
import { Outlet } from 'react-router-dom';

import UserProvider from 'src/providers/UserProvider';
import LoginProvider from 'src/providers/LoginProvider';
import Header from '../Header';
import ArtLeftBar from '../ArtLeftBar';
import ArtRightBar from '../ArtRightBar';

import useScrollToTop from 'src/hooks/useScrollToTop';

import './styles.scss';

export const App = () => {
  useScrollToTop();

  return (
    <UserProvider>
      <LoginProvider>
        <Header />
        <div className="content">
          <ArtLeftBar />
          <Outlet />
          <ArtRightBar />
        </div>
      </LoginProvider>
    </UserProvider>
  );
};
