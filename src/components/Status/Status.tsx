import React from 'react';
import Dayjs from 'dayjs';
import cx from 'classnames';

import './styles.scss';

export const Status = (
  {
    isOnline = false,
    isSmall = true,
    lastSeen,
    className
  }: any
) => {
  const statusClass = cx('status', className);

  return (
    <div className={statusClass}>
      {isOnline ?
        <div>
          <div className="status__online" />
          {!isSmall && <span className="status__tagline">online</span>}
        </div> :
        <div className="status__last-seen">
          {Dayjs(lastSeen).fromNow(true)}
        </div>
      }
    </div>
  )
};
