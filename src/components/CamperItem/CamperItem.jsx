import { useNavigate } from 'react-router-dom';
import { shortenDescription } from '../../helpers/formatUtils.js';
import FeatureItemsList from '../FeatureItemsList/FeatureItemsList';
import RatingLocation from '../RatingLocation/RatingLocation';
import { switchFavorites } from '../../redux/campers/slice';
import { selectFavorites } from '../../redux/campers/selectors';
import { useSelector, useDispatch } from 'react-redux';
import sprite from '../../assets/icons.svg';
import styles from './CamperItem.module.css';

const CamperItem = ({ data }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const navigate = useNavigate();

  const navigateToDetails = id => {
    navigate(`/catalog/${id}`);
  };

  const handleClick = id => {
    dispatch(switchFavorites(id));
  };

  return (
    <div className={styles.camperItemContainer}>
      <div className={styles.imageContainer}>
        {data.gallery && data.gallery.length > 0 ? (
          <img src={data.gallery[0].thumb} alt={`${data.name} thumbnail`} />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className={styles.camperItemInfoContainer}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <h2 className={styles.headerTitleText}>{data.name}</h2>
            <div className={styles.priceLikeContainer}>
              <p className={styles.headerTitleText}>
                &#8364;
                {typeof data.price === 'number' ? data.price.toFixed(2) : 'N/A'}
              </p>
              <button
                className={styles.invisibleButton}
                onClick={() => handleClick(data.id)}
              >
                <svg
                  width="24"
                  height="20"
                  className={
                    favorites.includes(data.id)
                      ? styles.redHeart
                      : styles.blackHeart
                  }
                >
                  <use href={`${sprite}#icon-heart`} />
                </svg>
              </button>
            </div>
          </div>
          <RatingLocation
            rating={data.rating}
            reviewsCount={data.reviews.length}
            location={data.location}
          />
        </div>
        <p className={styles.description}>
          {shortenDescription(data.description)}
        </p>
        <FeatureItemsList data={data} adjustColor={false} />
        <button onClick={() => navigateToDetails(data.id)}>Show more</button>
      </div>
    </div>
  );
};

export default CamperItem;
