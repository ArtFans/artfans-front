import React from 'react';
import cx from 'classnames';

import './styles.scss';

export const Loader = ({ isBig = true }: any) => {
  const loaderClass = cx('loader', { 'loader--big': isBig });

  return (
    <div className={loaderClass}>
      <div className="loader__bar" />
    </div>
  );
};
