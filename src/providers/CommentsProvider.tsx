import React, {
  createContext,
  useState,
  useEffect,
  useCallback
} from 'react';
import { useParams, Outlet } from 'react-router-dom';

import NearService from '../services/NearService';
import ApiService from '../services/ApiService';

export const CommentsContext = createContext({});

const CommentsProvider = () => {
  const [comments, setComments] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchComments = useCallback(async () => {
    setComments([]);
    try {
      const result = await NearService.contract.get_post_messages({
        post_id: id,
        from_index: comments.length.toString(),
        limit: '500'
      });

      setComments((state: any) => [...state, ...result]);
    } catch (error) {
      console.log(error);
    }
  }, [id, comments.length]);

  const addComment = useCallback(async ({ sender, text, parent }: any) => {
    if (!loading) {
      setLoading(true);
      try {
        const ipfsHash = await ApiService.saveToIpfs(text);

        if (parent) {
          await NearService.contract.add_message_to_message({
            parent_msg_id: {
              post_id: id,
              msg_idx: parent
            },
            text
          });
        } else {
          await NearService.contract.add_message_to_post({
            post_id: id,
            text: ipfsHash || text
          });
        }

        setComments((state: any) => [
          ...state,
          {
            text,
            account: sender,
            timestamp: new Date().getTime(),
            msg_idx: state.length.toString(),
            likes_count: '0',
            parent_idx: parent,
          }
        ]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [loading, id]);

  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <CommentsContext.Provider
      value={{
        loading,
        comments,
        addComment,
        count: comments.length,
      }}
    >
      <Outlet />
    </CommentsContext.Provider>
  );
};

export default CommentsProvider;
