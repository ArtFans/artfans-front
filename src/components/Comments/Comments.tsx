import React, { useRef, useContext, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import Icon from '../Icon';
import Loader from '../Loader';
import Container from '../Container';
import { CommentsItem } from './CommentsItem';

import { UserContext } from 'src/providers/UserProvider';
import { LoginContext } from 'src/providers/LoginProvider';
import { CommentsContext } from 'src/providers/CommentsProvider';

import './styles.scss';

export const Comments = ({ artId }: any) => {
  const textRef = useRef<any>(null);

  const { user, isLoggedIn } = useContext<any>(UserContext);
  const { setLoginStarted } = useContext<any>(LoginContext);
  const { loading, comments, addComment } = useContext<any>(CommentsContext);

  const onSend = useCallback(async () => {
    if (!isLoggedIn) return setLoginStarted(true);
    if (textRef?.current && textRef.current?.value.length) {
      const text = textRef.current?.value;
      await addComment({ sender: user.id, text });

      textRef.current.value = '';
      textRef.current.style.height = '16px';
    }
  }, [addComment, user.id, isLoggedIn, setLoginStarted]);

  const handleKeyDown = useCallback((event: any) => {
    if (event.ctrlKey && event.keyCode === 13) {
      onSend();
    }
  }, [onSend]);

  return (
    <div className="comments">
      <div className="comments__header">
        <TextareaAutosize
          disabled={loading}
          ref={textRef}
          name="message"
          className="comments__message"
          placeholder="Add a comment..."
          onKeyDown={handleKeyDown}
        />
        <button className="comments__send" onClick={onSend}>
          {loading ? <Loader isBig={false} /> : <Icon name="send" />}
        </button>
      </div>
      <Container className="comments__list">
        {comments.map((comment: any) => (
          <CommentsItem
            key={comment.msg_idx}
            artId={artId}
            {...comment}
          />
        ))}
      </Container>
    </div>
  );
};
