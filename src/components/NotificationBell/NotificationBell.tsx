import React from 'react';
import cx from 'classnames';

import Icon from '../Icon';

import './styles.scss';

export const NotificationBell = ({ count = 0, type = 'md', className, ...props }: any) => {
  const bellClass = cx(
    'notification-bell',
    `notification-bell--${type}`,
    className
  );

  return (
    <div className={bellClass} {...props}>
      <Icon name="bell" size={type} />
      {!!count && (
        <span className="notification-bell__count">
          {count}
        </span>
      )}
    </div>
  );
};
