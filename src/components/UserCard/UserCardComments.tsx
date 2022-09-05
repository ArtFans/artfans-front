import React from 'react';

import Icon from '../Icon';

export const UserCardComments = ({ count }: any) => !count ? null : (
  <div className="user-card__social user-card__social-comment">
    <Icon name="message-square" />
    <span className="user-card__amount">{count}</span>
  </div>
);
