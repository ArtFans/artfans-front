import React from 'react';
import { useLocation } from 'react-router-dom';

import ArtButton from 'src/components/ArtButton';

const headerTitle: any = {
  '/settings/profile': 'Edit profile',
  '/settings/my-nfts': 'My NFTs',
  '/settings/my-collections': 'My Collections',
  '/settings/password': 'Password'
};

export const SettingsHeader = ({ hasChanges, onSave, isLoading }: any) => {
  const { pathname } = useLocation();

  return (
    <div className="settings-page__header">
      <h1 className="settings-page__header-title">
        {headerTitle[pathname]}
      </h1>
      <div className="settings-page__header-actions">
        {hasChanges && (
          <ArtButton
            as="button"
            onClick={onSave}
            loading={isLoading}
            className="settings-page__header-action"
          >
            Save
          </ArtButton>
        )}
        {/*<ArtButton icon="eye-off" className="settings-page__header-action" />*/}
        {/*<ArtButton icon="trash-2" className="settings-page__header-action" />*/}
      </div>
    </div>
  );
};
