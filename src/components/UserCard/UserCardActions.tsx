import React, {
  useState,
  useCallback,
  useEffect,
  useContext
} from 'react';
import cx from 'classnames';

import Icon from '../Icon';

import NearService from 'src/services/NearService';

import { UserContext } from 'src/providers/UserProvider';

const actionsTypes: any = {
  like: 'heart',
  upvote: 'plus'
};

export const UserCardActions = (
  {
    artId,
    messageId,
    type = 'like',
    count = 0
  }: any
) => {
  const [isLiked, setLiked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [likesCount, setLikes] = useState(count);

  const { user: { id } } = useContext<any>(UserContext);

  const likesClass = cx(
    'user-card__social',
    { 'user-card__social--liked': isLiked }
  );

  const fetchLikes = useCallback(async () => {
    try {
      let liked = false;
      if (type === 'like') {
        const [userId] = await NearService.contract.get_post_likes({
          post_id: artId, from_index: '0', limit: '100'
        });

        liked = userId === id;
      }

      if (type === 'upvote') {
        const [userId] = await NearService.contract.get_message_likes({
          msg_id :{
            post_id: artId, msg_idx: messageId
          },
          from_index: '0',
          limit: '100'
        });

        liked = userId === id;
      }

      setLiked(liked);

      if (liked) {
        setLikes((state: any) => state + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }, [artId, id, type, messageId]);

  const onClick = useCallback(async () => {
    if (!isLoading) {
      setLoading(true);
      try {
        if (type === 'like') {
          await NearService.contract.like_post({ post_id: artId });
        } else {
          await NearService.contract.like_message({
            msg_id: {
              post_id: artId, msg_idx: messageId
            }
          });
        }

        if (!isLiked) {
          setLikes((state: number) => state + 1);
        } else {
          setLikes((state: number) => state - 1);
        }

        setLiked(!isLiked);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [type, artId, messageId, isLiked, isLoading]);

  useEffect(() => {
    fetchLikes();
  }, []);

  return (
    <button className={likesClass} onClick={onClick}>
      <Icon
        isSpin={isLoading}
        name={isLoading ? 'loader' : actionsTypes[type]}
      />
      {!!likesCount && <span className="user-card__amount">{likesCount}</span>}
    </button>
  );
};
