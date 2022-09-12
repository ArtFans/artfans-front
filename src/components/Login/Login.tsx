import React, { useState, createElement, useEffect } from 'react';

import ArtButton from '../ArtButton';
import { LoginConnect } from './LoginConnect';
import { LoginNfts } from './LoginNfts';
import { LoginComplete } from './LoginComplete';
// import { LoginProfile } from './LoginProfile';

import './styles.scss';

const steps: any = {
  1: LoginConnect,
  2: LoginNfts,
  // 3: LoginProfile,
};

export const Login = ({ initialStep = 1, onLogin, onClose }: any) => {
  const [step, setStep] = useState(initialStep);

  const onNext = () => setStep(step + 1);

  useEffect(() => {
    if (!steps[step]) {
      onLogin();
    }
  }, [step, onLogin]);

  return (
    <div className="login">
      <div className="login__header">
        {steps[step] && (
          <span className="login__step">Step {step} of 2</span>
        )}
        <ArtButton icon="x" onClick={onClose} size="small" />
      </div>
      {
        steps[step] ?
          createElement(steps[step], { onNext }) :
          <LoginComplete />
      }
    </div>
  );
};
