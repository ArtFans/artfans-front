import React, { useState } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import Icon from '../Icon';
import Avatar from '../Avatar';
import ArtButton from '../ArtButton';
import Grid, { GridCell } from '../Grid';

import './styles.scss';

export const CommunityCard = (
  {
    id,
    username,
    name,
    isFollowing = false,
    collections = 0,
    nfts = 0,
    followers = 0
  }:any
) => {
  const [isLoading, setLoading] = useState(false);
  const [follow, setFollowing] = useState(isFollowing);

  const followClass = cx(
    'community-card__follow',
    { 'community-card__follow--following': follow }
  );

  const onToggleFollowing = (event: Event) => {
    event.preventDefault();
    setFollowing(!follow);
  };

  return (
    <div className="community-card">
      <div className="community-card__body">
        <Avatar
          id={id}
          name={name}
          size="xxl"
          className="community-card__avatar"
        />
        <Link to={`/profile/${id}`} className="community-card__name">
          {name}
        </Link>
        {username && (
          <div className="community-card__username">@{username}</div>
        )}
        {!!followers && (
          <div className="community-card__followers">
            {followers} followers
          </div>
        )}
      </div>
      {
        (!!collections || !!nfts) && (
          <Grid className="community-card__items">
            <GridCell rows={2}>
              <div className="community-card__item">
                <Icon size="sm" name="folder" />
                {collections}
              </div>
            </GridCell>
            <GridCell rows={2}>
              <div className="community-card__item">
                <Icon size="sm" name="file" />
                {nfts}
              </div>
            </GridCell>
          </Grid>
        )
      }
      <ArtButton
        size="tiny"
        className={followClass}
        onClick={onToggleFollowing}
      >
        {follow ? 'Following' : 'Follow'}
      </ArtButton>
    </div>
  );
};
