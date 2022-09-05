import React from 'react';
import cx from 'classnames';

export const GridCell = ({ children, className, rows, ...props }: any) => {
  const cellClass = cx(
    className,
    'grid__cell',
    { [`grid__cell--row-${rows}`]: !!rows }
  );

  return (
    <div className={cellClass} {...props}>
      {children}
    </div>
  );
};
