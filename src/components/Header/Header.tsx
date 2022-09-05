import React, { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Login from '../Login';
import ArtModal from '../ArtModal';
import ArtButton from '../ArtButton';
import HeaderMenu from '../HeaderMenu';
import { UserContext } from 'src/providers/UserProvider';

import './styles.scss';

export const Header = () => {
  const [searchParams] = useSearchParams();
  const [isLoginStarted, setLoginStarted] = useState(false);

  const { setLoggedIn, isLoggedIn } = useContext<any>(UserContext);

  useEffect(() => {
    if (searchParams.get('login') && !isLoggedIn) {
      setLoginStarted(true);
    }
  }, [searchParams, isLoggedIn]);

  return (
    <header className="header">
      <div>
        <Link to="/" className="header__logo">
          ARTFANS
        </Link>
        <span className="header__tagline">
            Social network for NFT lovers
          </span>
      </div>
      {isLoggedIn ?
        <HeaderMenu /> :
        <ArtButton
          onClick={() => setLoginStarted(true)}
          className="header__button header__button--login"
        >
          Login
        </ArtButton>
      }
      <ArtModal
        open={isLoginStarted}
        withClose={false}
        onClose={() => setLoginStarted(false)}
      >
        <Login
          initialStep={searchParams.get('login') ? 2 : 1}
          onLogin={() => setLoggedIn(true)}
          onClose={() => setLoginStarted(false)}
        />
      </ArtModal>
    </header>
  );
};
