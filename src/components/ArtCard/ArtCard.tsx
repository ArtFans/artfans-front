import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import useArtMetadata from 'src/hooks/useArtMetadata';

import UserCard, { UserCardActions } from '../UserCard';

import './styles.scss';

export const ArtCard = (props: any) => {
  const {
    _id,
    total_likes,
    owner_id,
    isTiny = false,
    metadata
  } = props;

  const { issuedAt, media, isVideo } = useArtMetadata(metadata);

  const cardClass = cx(
    'art-card',
    { 'art-card--tiny': isTiny }
  );

  return (
    <div className={cardClass}>
      <Link
        to={`/art/${_id}`}
        state={props}
        className="art-card__img"
      >
        {isVideo ? (
          <video
            className="art-card__video"
            src={media}
            autoPlay={true}
            loop={true}
            muted={true}
          >
            <source src={media} type={metadata.mime_type} />
          </video>
        ) : <img data-src={media} src={media} alt="" />}
      </Link>
      {!isTiny && (
        <UserCard id={owner_id} username={owner_id} issuedAt={issuedAt}>
          <UserCardActions artId={_id} count={total_likes} />
        </UserCard>
      )}
    </div>
  );
};
