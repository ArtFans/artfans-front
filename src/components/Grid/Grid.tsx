import React from 'react';
import cx from 'classnames';

import './styles.scss';

export const Grid = ({ children, className }: any) => {
  const gridClass = cx('grid', className);

  return (
    <div className={gridClass}>
      {children}
    </div>
  );
};
