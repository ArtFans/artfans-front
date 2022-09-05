import { createElement } from 'react';
import cx from 'classnames';

import './styles.scss';

export const ArtTitle = ({ tag = 'div', children, className }: any) => {
  const titleClass = cx(className, 'art-title');

  return  createElement(tag, { className: titleClass, children });
};
