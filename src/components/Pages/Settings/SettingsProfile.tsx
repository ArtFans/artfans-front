import React, { useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';

import toBase64 from 'src/helpers/toBase64';

import ArtInput from 'src/components/ArtInput';
import Grid, { GridCell } from 'src/components/Grid';

export const SettingsProfile = () => {
  const { profile, setProfile } = useOutletContext<any>();

  const onChangeFiled = useCallback(({ target }: any) => {
    setProfile((state: any) => ({ ...state, [target.name]: target.value }));
  }, [setProfile]);

  const onChangeSocial = useCallback(({ target }: any) => {
    let value: string = target.value;

    if (target.value.startsWith('@')) {
      const [, id] = target.value.split('@');
      value = id;
    }

    if (target.value.startsWith('http')) {
      const [,,, id] = target.value.split('/');
      value = id;
    }

    setProfile((state: any) => ({ ...state, [target.name]: value }));
  }, [setProfile]);

  const onChangeImage = useCallback(async ({ target }: any) => {
    try {
      const [file] = target.files;
      const base64 = await toBase64(file);

      setProfile((state: any) => ({ ...state, image_url: base64 }));
    } catch (error) {
      console.log(error);
    }
  }, [setProfile]);

  return (
    <div className="settings-page__profile">
      <div className="settings-page__profile-avatar">
        <input type="file" name="image" onChange={onChangeImage} />
        {
          profile.image ?
            <img src={profile.image} alt="avatar" /> :
            <div className="settings-page__profile-no-avatar">
              NO<br />
              IMAGE
            </div>
        }
      </div>
      <div className="settings-page__profile-fields">
        <ArtInput
          title="Full name"
          name="name"
          defaultValue={profile.name}
          onChange={onChangeFiled}
          required={true}
        />
        <ArtInput
          title="Short bio"
          name="bio"
          placeholder="e.g. NFT Creator & Seller"
          defaultValue={profile.bio}
          onChange={onChangeFiled}
        />
        <ArtInput
          title="Location"
          name="location"
          placeholder="e.g NY, Brooklyn"
          defaultValue={profile.location}
          onChange={onChangeFiled}
        />
        <ArtInput
          title="Age"
          name="age"
          defaultValue={profile.age}
          type="number"
          min={0}
          onChange={onChangeFiled}
        />
        <Grid>
          <GridCell rows={2}>
            <ArtInput
              title="Instagram @ID"
              name="instagram"
              placeholder="e.g. lastbornband"
              defaultValue={profile.instagram}
              onChange={onChangeSocial}
            />
          </GridCell>
          <GridCell rows={2}>
            <ArtInput
              title="Twitter @ID"
              name="twitter"
              placeholder="e.g. banksy"
              defaultValue={profile.twitter}
              onChange={onChangeSocial}
            />
          </GridCell>
        </Grid>
        <ArtInput
          title="GitHub username"
          name="github"
          placeholder="e.g. vitaliyshalak"
          defaultValue={profile.github}
          onChange={onChangeSocial}
        />
        <ArtInput
          title="YouTube link"
          name="youtube"
          defaultValue={profile.youtube}
          onChange={onChangeFiled}
        />
      </div>
    </div>
  );
};
