import React from 'react';
import DayJs from 'dayjs';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import Avatar from '../Avatar';

import './styles.scss';

export const UserCard = (props: any) => {
  const {
    id,
    name,
    username,
    issuedAt,
    className,
    children
  } = props;

  const cardClass = cx(className, 'user-card');

  return (
    <div className={cardClass}>
      <Avatar id={id} name={name} size="sm" />
      <div className="user-card__info">
        <Link
          to={`/profile/${id}`}
          className="user-card__username"
        >
          {username}
        </Link>
        {!!issuedAt && (
          <div className="user-card__issued">
            {DayJs(issuedAt).fromNow()}
          </div>
        )}
      </div>
      <div className="user-card__social">
        {children}
      </div>
    </div>
  );
}
