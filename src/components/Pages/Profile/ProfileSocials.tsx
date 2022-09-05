import React from 'react';

import Icon from 'src/components/Icon';

export const ProfileSocials = ({ socials = {} }: any) => {
  if (!Object.values(socials).filter(item => item).length) return null;

  return (
    <div className="profile-page__socials">
      {Object.keys(socials).filter(social => socials[social]).map((social: any) => (
        <a
          key={social}
          href={
            social === 'youtube' ?
              socials[social] :
              `https://${social}.com/${socials[social]}`
          }
          target="_blank"
          className="profile-page__socials-link"
          rel="noreferrer"
        >
          <Icon name={social} />
        </a>
      ))}
    </div>
  );
};
