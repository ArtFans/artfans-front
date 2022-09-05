import React, {
  useMemo,
  useState,
  useContext,
  useCallback,
} from 'react';
import { Outlet } from 'react-router-dom';

import Container from 'src/components/Container';
import { SettingsNav } from './SettingsNav';
import { SettingsHeader } from './SettingsHeader';

import { UserContext } from 'src/providers/UserProvider';

import './styles.scss';

export const Settings = () => {
  const { user, updateProfile } = useContext<any>(UserContext);
  const [profile, setProfile] = useState(user.profile);
  const [isLoading, setLoading] = useState(false);

  const onSave = useCallback(async () => {
    setLoading(true);
    await updateProfile(profile);
    setLoading(false);
  }, [profile, updateProfile]);

  const hasChanges = useMemo(() => (
    JSON.stringify(profile) !== JSON.stringify(user.profile)
  ), [user.profile, profile]);

  return (
    <div className="settings-page">
      <SettingsNav />
      <div className="settings-page__content">
        <SettingsHeader
          hasChanges={hasChanges}
          onSave={onSave}
          isLoading={isLoading}
        />
        <Container className="settings-page__container">
          <Outlet context={{ profile, setProfile }} />
        </Container>
      </div>
    </div>
  );
};
