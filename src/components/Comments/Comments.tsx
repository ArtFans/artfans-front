import React, { useRef, useContext, useCallback, useState } from 'react';
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
  const [replyTo, setReplyTo] = useState<any>({});
  const textRef = useRef<any>(null);

  const { user, isLoggedIn } = useContext<any>(UserContext);
  const { setLoginStarted } = useContext<any>(LoginContext);
  const {
    loading,
    comments,
    addComment
  } = useContext<any>(CommentsContext);

  const onSend = useCallback(
    async () => {
      if (!isLoggedIn) return setLoginStarted(true);
      if (textRef?.current && textRef.current?.value.length) {
        const text = textRef.current?.value;

        await addComment({
          sender: user.id,
          text,
          parent: replyTo.msg_idx
        });

        textRef.current.value = '';
        textRef.current.style.height = '20px';
        if (replyTo.msg_idx) {
          setReplyTo({});
        }
      }
    },
    [
      addComment,
      user.id,
      isLoggedIn,
      setLoginStarted,
      replyTo.msg_idx
    ]
  );

  const handleKeyDown = useCallback((event: any) => {
    if (event.ctrlKey && event.keyCode === 13) {
      onSend();
    }
  }, [onSend]);

  const onReply = (data: any) => {
    setReplyTo(data);
    textRef?.current.focus();
  };

  return (
    <div className="comments">
      {replyTo.account && (
        <div className="comments__reply">
          <Icon name="corner-up-left" />
          <div className="comments__reply-to">
            <span>@{replyTo.account}</span>
            {replyTo.message}
          </div>
          <Icon
            name="x"
            className="comments__reply-cancel"
            onClick={() => setReplyTo({})}
          />
        </div>
      )}
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
        {
          comments
            .filter((comment: any) => !comment.parent_idx)
            .map((comment: any) => ({
              ...comment,
              replies: comments
                .filter((reply: any) => reply.parent_idx === comment.msg_idx)
            }))
            .map((comment: any) => (
              <CommentsItem
                onReply={onReply}
                key={comment.msg_idx}
                artId={artId}
                {...comment}
              />
            ))
        }
      </Container>
    </div>
  );
};
