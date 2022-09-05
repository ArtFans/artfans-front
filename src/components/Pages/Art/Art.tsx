import React, {
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import ApiService from 'src/services/ApiService';

import formatNumber from 'src/helpers/formatNumber';
import useArtMetadata from 'src/hooks/useArtMetadata';

import Icon from 'src/components/Icon';
import Container from 'src/components/Container';
import ArtTitle from 'src/components/ArtTitle';
import ArtButton from 'src/components/ArtButton';
import ArtModal from 'src/components/ArtModal';
import Comments from 'src/components/Comments';
import UserCard, { UserCardComments, UserCardActions } from 'src/components/UserCard';
import Loader from 'src/components/Loader';
import { ArtOtherNft } from './ArtOtherNft';

import { CommentsContext } from 'src/providers/CommentsProvider';

import './styles.scss';

export const Art = () => {
  const [imageOpened, setImageOpened] = useState(false);
  const navigate = useNavigate();
  const { state }: { state: any } = useLocation();
  const { id } = useParams();

  const [art, setArt] = useState<any>();
  const [arts, setArts] = useState([]);

  const { media, isVideo } = useArtMetadata(art?.metadata);
  const { count } = useContext<any>(CommentsContext);

  const fetchArt = useCallback(async () => {
    const artResult = state || await ApiService.getArtById(id);
    setArt(artResult);

    const artsResult = await ApiService.getFriendsArts({
      friends: [state.owner_id]
    });
    setArts(artsResult.filter((item: any) => item._id !== id));
  }, [id, state]);

  useEffect(() => {
    fetchArt();
  }, [id]);

  if (!art) return <Loader />;

  return (
    <div className="art-page">
      <div className="art-page__item">
        <div className="art-page__img-container">
          <Icon
            name="arrow-left"
            className="art-page__icon art-page__icon--back"
            isRound={true}
            onClick={() => navigate(-1)}
          />
          <div
            className="art-page__img-overlay"
            onClick={() => setImageOpened(!imageOpened)}
          >
            {
              !isVideo ?
                <img src={media} alt="" /> :
                (
                  <video src={media} autoPlay={true} loop={true} muted={true}>
                    <source src={media} type={art.metadata.mime_type} />
                  </video>
                )
            }
            <Icon
              name="maximize"
              isRound={true}
              className="art-page__icon art-page__icon--zoom"
            />
          </div>
        </div>
        <ArtOtherNft ownerId={art.owner_id} arts={arts} />
      </div>
      <div className="art-page__content">
        <Container className="art-page__header">
          <div className="art-page__collection-name">
            {art.metadata.collection}
          </div>
          <h1 className="art-page__header-title">
            {art.metadata.title}
          </h1>
        </Container>
        <Container className="art-page__user">
          <UserCard
            className="art-page__user-card"
            id={art.owner_id}
            username={art.owner_id}
          >
            <UserCardComments count={count} />
            <UserCardActions artId={art._id} count={art.total_likes} />
          </UserCard>
          {art.has_price && (
            <ArtButton className="art-page__buy" size="small">
              <span>Buy {formatNumber(art.price)}N</span>
              <span className="art-page__usd">$2 500 232</span>
            </ArtButton>
          )}
        </Container>
        {art.metadata.description && (
          <Container className="art-page__about">
            <ArtTitle className="art-page__title">
              About Nft
            </ArtTitle>
            <div className="art-page__description">
              {art.metadata.description}
            </div>
          </Container>
        )}
        <ArtOtherNft
          ownerId={art.owner_id}
          arts={arts}
          forDesktop={false}
        />
        <Comments artId={art._id} />
      </div>
      <ArtModal open={imageOpened} onClose={() => setImageOpened(false)}>
        {
          !isVideo ?
            <img src={media} alt="" /> :
            (
              <video src={media} controls={true}>
                <source src={media} type={art.metadata.mime_type} />
              </video>
            )
        }
      </ArtModal>
    </div>
  );
};
