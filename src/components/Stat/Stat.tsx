import React from 'react';
import cx from 'classnames';

import formatNumber from 'src/helpers/formatNumber';

import './styles.scss';

export const Stat = (
  {
    prefix,
    value = 0,
    name,
    classNames,
    ...props
  }: any
) => {
  const statClass = cx(classNames, 'stat');

  return (
    <div className={statClass} {...props}>
      <div className="stat__value">
        {prefix}{formatNumber(value)}
      </div>
      {name && <div className="stat__name">{name}</div>}
    </div>
  )
};
