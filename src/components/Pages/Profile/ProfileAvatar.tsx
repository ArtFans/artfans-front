import React, { useState } from 'react';

import ArtModal from 'src/components/ArtModal';

export const ProfileAvatar = ({ url }: any) => {
  const [avatarOpened, setAvatarOpened] = useState(false);

  if (!url) return null;

  return (
    <>
      <div
        className="profile-page__avatar"
        onClick={() => setAvatarOpened(!avatarOpened)}
      >
        <img
          src={url}
          alt="avatar"
          className="profile-page__avatar-img"
        />
      </div>
      <ArtModal open={avatarOpened} onClose={() => setAvatarOpened(false)}>
        <img src={url} alt="" />
      </ArtModal>
    </>
  );
};
