import React, {
  useState,
  useCallback,
  useEffect,
  useContext
} from 'react';
import cx from 'classnames';

import Icon from '../Icon';
import Loader from '../Loader';

import NearService from 'src/services/NearService';

import { UserContext } from 'src/providers/UserProvider';
import { LoginContext } from 'src/providers/LoginProvider';

const actionsTypes: any = {
  like: {
    icon: 'heart',
    get: 'get_post_likes_info',
    like: 'like_post',
    unlike: 'unlike_post'
  },
  upvote: {
    icon: 'plus',
    get: 'get_message_likes_info',
    like: 'like_message',
    unlike: 'unlike_message'
  }
}

export const UserCardActions = ({ artId, messageId, type = 'like', isFake = false }: any) => {
  const [isLiked, setLiked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [likesCount, setLikes] = useState(0);

  const { user: { id }, isLoggedIn } = useContext<any>(UserContext);
  const { setLoginStarted } = useContext<any>(LoginContext);

  const likesClass = cx(
    'user-card__social',
    { 'user-card__social--liked': isLiked }
  );

  const fetchLikes = useCallback(async () => {
    try {
      const { likes_count, is_liked } = await NearService
        .contract[actionsTypes[type].get]({
          post_id: artId,
          account_id: id,
          msg_id: messageId
        });

      setLikes(Number(likes_count));
      setLiked(is_liked);
    } catch (error) {
      console.log(error);
    }
  }, [artId, id, type, messageId]);

  const onClick = useCallback(async () => {
    if (!isLoggedIn) return setLoginStarted(true);
    if (!isLoading) {
      setLoading(true);
      try {
        const likeData = {
          post_id: artId,
          msg_id: { post_id: artId, msg_idx: messageId }
        };

        if (!isLiked) {
          await NearService.contract[actionsTypes[type].like](likeData);
          setLikes((state: number) => state + 1);
        } else {
          await NearService.contract[actionsTypes[type].unlike](likeData);
          setLikes((state: number) => state - 1);
        }

        setLiked(!isLiked);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [type, artId, messageId, isLiked, isLoading, isLoggedIn, setLoginStarted]);

  useEffect(() => {
    if (!isFake) fetchLikes();
  }, []);

  return (
    <button className={likesClass} onClick={onClick}>
      {isLoading ? <Loader isBig={false} /> : <Icon name={actionsTypes[type].icon} />}
      {!!likesCount && <span className="user-card__amount">{likesCount}</span>}
    </button>
  );
};
