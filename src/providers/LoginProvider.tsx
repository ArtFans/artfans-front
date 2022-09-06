import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ReactNode } from 'react';

import { UserContext } from './UserProvider';

export const LoginContext = createContext({});

const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();
  const [isLoginStarted, setLoginStarted] = useState(false);
  const { user: { profileFilled } } = useContext<any>(UserContext);

  useEffect(() => {
    if (searchParams.get('login') && !profileFilled) {
      setLoginStarted(true);
    }
  }, [searchParams, profileFilled]);

  return (
    <LoginContext.Provider
      value={{
        isLoginStarted,
        setLoginStarted
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
