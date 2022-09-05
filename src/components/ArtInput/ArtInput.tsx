import React from 'react';

import './styles.scss';

export const ArtInput = ({ title, ...props }: any) => {
  return (
    <div className="art-input">
      <div className="art-input__title">
        {title}
        {props.required && <span className="art-input__required">*</span>}
      </div>
      <input className="art-input__field" {...props} />
    </div>
  );
};
