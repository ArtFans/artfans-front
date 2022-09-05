import React from 'react';

import Icon from '../Icon';

export const LoginComplete = () => {
  return (
    <>
      <div className="login__body">
        <Icon
          name="check"
          isRound={true}
          className="login__icon"
        />
        <h1 className="login__title">Awesome!!!</h1>
        Your profile was created!
      </div>
    </>
  );
};
