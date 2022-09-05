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
    try {
      const result = await NearService.contract.get_post_messages({
        post_id: id,
        from_index: comments.length.toString(),
        limit: '100'
      });

      setComments((state: any) => [...state, ...result]);
    } catch (error) {
      console.log(error);
    }
  }, [id, comments.length]);

  const addComment = useCallback(async ({ sender, text }: any) => {
    if (!loading) {
      setLoading(true);
      try {
        const ipfsHash = await ApiService.saveToIpfs(text);

        await NearService.contract.add_message_to_post({
          post_id: id,
          text: ipfsHash || text
        });

        setComments((state: any) => [
          ...state,
          {
            account: sender,
            text,
            timestamp: new Date().getTime(),
            msg_idx: state.length,
            likes_count: '0'
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
  }, []);

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
