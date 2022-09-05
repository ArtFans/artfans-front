import React, { useCallback, useContext, useState } from 'react';

import ArtButton from '../ArtButton';
import ArtInput from '../ArtInput';
import Grid, { GridCell } from '../Grid';

import { UserContext } from 'src/providers/UserProvider';

export const LoginProfile = ({ onNext }: any) => {
  const [isLoading, setLoading] = useState(false);
  const { updateProfile } = useContext<any>(UserContext);

  const onSubmit: any = useCallback(async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const { name, bio, age } = event.target;

    const profile = {
      name: name.value,
      bio: bio.value,
      age: age.value
    };

    await updateProfile(profile);

    onNext();
  }, [onNext, updateProfile]);

  return (
    <form onSubmit={onSubmit}>
      <div className="login__body">
        <h1 className="login__title">Create your profile</h1>
        <div className="login__inputs">
          <ArtInput name="name" title="Full Name" required={true} />
          <Grid>
            <GridCell rows={2}>
              <ArtInput name="bio" title="Short bio" />
            </GridCell>
            <GridCell rows={2}>
              <ArtInput type="number" min={0} name="age" title="Age" />
            </GridCell>
          </Grid>
        </div>
      </div>
      <div className="login__footer">
        <ArtButton
          as="button"
          type="submit"
          loading={isLoading}
        >
          Create Profile
        </ArtButton>
      </div>
    </form>
  );
};
