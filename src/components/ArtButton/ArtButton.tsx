import React, { createElement } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import Icon from '../Icon';

import './styles.scss';

const tag: any = {
  link: Link,
  button: 'button',
};

export const ArtButton = (
  {
    as = 'link',
    children,
    to = {},
    size = 'large',
    icon,
    className,
    loading,
    ...props
  }: any
) => {
  const btnClass = cx(className, `art-button art-button--${size}`);

  const textClass = cx(
    'art-button__text',
    { 'art-button__text--icon': !!icon },
  );


  return createElement(tag[as], {
    className: btnClass,
    to,
    disabled: loading,
    children: !loading ? (
      <>
        {icon && <Icon className="art-button__icon" name={icon} />}
        {children && (
          <span className={textClass}>
            {children}
          </span>
        )}
      </>
    ) : <Icon name="loader" isSpin={true} />,
    ...props
  });
};
