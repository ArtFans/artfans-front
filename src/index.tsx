import React from 'react';
import DayJs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import * as buffer from 'buffer';

import './assets/scss/normalize.scss';

import NearService from './services/NearService';
import Router from './components/Router';

(window as any).Buffer = buffer.Buffer;

DayJs.extend(RelativeTime);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

window.nearInitPromise = NearService
  .init()
  .then(() => {
    root.render(<Router />);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
