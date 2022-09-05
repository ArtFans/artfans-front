import React, { useRef, useContext, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import Icon from '../Icon';
import Container from '../Container';
import { CommentsItem } from './CommentsItem';

import { UserContext } from 'src/providers/UserProvider';
import { CommentsContext } from 'src/providers/CommentsProvider';

import './styles.scss';

export const Comments = ({ artId }: any) => {
  const textRef = useRef<any>(null);

  const { user } = useContext<any>(UserContext);
  const { loading, comments, addComment } = useContext<any>(CommentsContext);

  const onSend = useCallback(async () => {
    if (textRef?.current && textRef.current?.value.length) {
      const text = textRef.current?.value;
      await addComment({ sender: user.id, text });

      textRef.current.value = '';
      textRef.current.style.height = '16px';
    }
  }, [addComment, user.id]);

  const handleKeyDown = useCallback((event: any) => {
    if (event.ctrlKey && event.keyCode === 13) {
      onSend();
    }
  }, [onSend]);
console.log(comments);
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
          <Icon
            isSpin={loading}
            name={loading ? 'loader' : 'send'}
          />
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
