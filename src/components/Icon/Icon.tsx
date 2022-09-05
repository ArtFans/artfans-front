import React from 'react';
import cx from 'classnames';
import Feather from 'feather-icons/dist/feather-sprite.svg';

import './styles.scss';

const iconSizes: any = {
  sm: 15,
  md: 20,
};

export const Icon = (
  {
    name,
    size = 'md',
    fill = 'none',
    color = 'currentColor',
    className,
    children,
    isRound = false,
    isSpin = false,
    ...props
  }: any
) => {
  const iconClass = cx(
    `icon icon--${size}`,
    className,
    {
      'icon--round': isRound,
      'icon--pointer': !!props.onClick,
      'icon--spin': isSpin,
    }
  );

  return (
    <i className={iconClass} {...props}>
      <svg
        width={iconSizes[size]}
        height={iconSizes[size]}
        fill={fill}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <use href={`${Feather}#${name}`} />
      </svg>
      {children}
    </i>
  );
};
