import React, { useRef } from 'react';
import cx from 'classnames';

import useClickOutside from 'src/hooks/useClickOutside';

import './styles.scss';

export const Dropdown = ({ open, className, children, onClickOutside } : any) => {
  const dropdownRef = useRef(null);
  const dropdownClass = cx('dropdown', className);

  useClickOutside(dropdownRef, onClickOutside);

  return !open ? null : (
    <div ref={dropdownRef} className={dropdownClass}>
      <div className="dropdown__cursor-shadow" />
      <div className="dropdown__cursor" />
      <div className="dropdown__content">
        {children}
      </div>
    </div>
  );
};
