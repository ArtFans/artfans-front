import React, { useEffect, useCallback, useState } from 'react';
import cx from 'classnames';

import ApiService from 'src/services/ApiService';

import dateToMilliseconds from 'src/helpers/dateToMilliseconds';

import UserCard, { UserCardActions } from '../UserCard';

const CommentsItem = (
  {
    text,
    artId,
    account,
    msg_idx,
    parent_idx,
    likes_count,
    timestamp,
  }: any
) => {
  const [message, setMessage] = useState(text);
  const [isLoading, setLoading] = useState(true);

  const commentClass = cx(
    'comments__item',
    { 'comments__item--reply': parent_idx }
  );

  const fetchComment = useCallback(async () => {
    const result = await ApiService.getFromIpfs(text);
    setMessage(result || text);
    setLoading(false);
  }, [text]);

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <div className={commentClass}>
      <UserCard
        id={account}
        username={account}
        issuedAt={dateToMilliseconds(timestamp)}
        className="comments__item-user"
      >
        <UserCardActions
          type="upvote"
          count={Number(likes_count)}
          artId={artId}
          messageId={msg_idx}
        />
      </UserCard>
      <div className="comments__item-message">
        {message}
      </div>
    </div>
  )
};

export { CommentsItem };
