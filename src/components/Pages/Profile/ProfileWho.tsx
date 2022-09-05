import React from 'react';

import Status from 'src/components/Status';

export const ProfileWho = ({ id, name, isOnline = false }: any) => (
  <div className="profile-page__who">
    <div className="profile-page__name">
      {name && <h1>{name}</h1>}
      {isOnline && (
        <Status
          className="profile-page__status"
          isSmall={false}
          isOnline={isOnline}
        />
      )}
    </div>
    <h2 className="profile-page__username">@{id}</h2>
  </div>
);
