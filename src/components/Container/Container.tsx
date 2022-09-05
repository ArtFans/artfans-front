import React from 'react';
import cx from 'classnames';

import './styles.scss';

export const Container = ({ children, className }: any) => {
  const containerClass = cx('container', className);

  return (
    <div className={containerClass}>
      {children}
    </div>
  );
};
