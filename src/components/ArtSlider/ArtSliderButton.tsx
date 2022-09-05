import React from 'react';
import cx from 'classnames';

import Icon from '../Icon';

const btnTypes: any = {
  forward: 'arrow-right-circle',
  backward: 'arrow-left-circle'
};

export const ArtSliderButton = ({ type = 'forward', ...props }: any) => {
  const arrowClass = cx(
    'art-slider__btn',
    `art-slider__btn--${type}`
  );

  return (
    <Icon
      className={arrowClass}
      name={btnTypes[type]}
      {...props}
    />
  );
};
