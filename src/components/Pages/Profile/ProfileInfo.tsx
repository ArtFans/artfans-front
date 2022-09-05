import React from 'react';

export const ProfileInfo = ({ bio, location, age }: any) => (
  <>
    {bio && (
      <div className="profile-page__position">
        {bio}
      </div>
    )}
    {(location || age) && (
      <div className="profile-page__place">
        {location}
        {age && (
          <>
            <br />
            {age} years
          </>
        )}
      </div>
    )}
  </>
);
