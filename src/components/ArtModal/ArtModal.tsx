import React, { useRef } from 'react';
import cx from 'classnames';

import Icon from '../Icon';

import useClickOutside from 'src/hooks/useClickOutside';

import './styles.scss';

export const ArtModal = (
  {
    open = false,
    className,
    children,
    onClose,
    withClose = true
  }: any
) => {
  const modalRef = useRef(null);
  const modalClass = cx(className, 'art-modal');

  useClickOutside(modalRef, onClose);

  return !open ? null : (
    <div className={modalClass}>
      {withClose && (
        <Icon
          className="art-modal__close"
          name="x"
          onClick={onClose}
          isRound={true}
        />
      )}
      <div className="art-modal__body" ref={modalRef}>
        {children}
      </div>
    </div>
  );
};
