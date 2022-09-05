import React, { useMemo } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import './styles.scss';

export const Avatar = (
  {
    id,
    className,
    size = 'md',
    name,
    url,
    username,
    ...props
  }: any
) => {
  const containerClass = cx('avatar', `avatar--${size}`, className);
  const avatarClass = cx('avatar__user', `avatar__user--${size}`);

  const initials = useMemo(() => {
    if (name) {
      const [firstName, lastName] = name.split(' ');

      return `${firstName?.charAt(0)}${lastName ? lastName.charAt(0) : ''}`;
    }
  }, [name]);

  return (
    <Link to={`/profile/${id}`} className={containerClass} {...props}>
      <div className={avatarClass}>
        {!url ? initials : (
          <img className="avatar__img" src={url} alt="" />
        )}
      </div>
      {!!username && (
        <div className="avatar__username">
          {username}
        </div>
      )}
    </Link>
  );
};
