import { reformatLocation } from '../../helpers/formatUtils.js';
import sprite from '../../assets/icons.svg';
import styles from './RatingLocation.module.css';

const RatingLocation = ({ rating, reviewsCount, location }) => {
  return (
    <div className={styles.container}>
      <div className={styles.ratingContainer}>
        <svg width="16" height="16">
          <use href={`${sprite}#icon-star`} />
        </svg>
        <p className={styles.underlineText}>
          {rating}({reviewsCount} Reviews)
        </p>
      </div>
      <div className={styles.locationContainer}>
        <svg width="16" height="16">
          <use href={`${sprite}#icon-map`} />
        </svg>
        <p>{reformatLocation(location)}</p>
      </div>
    </div>
  );
};

export default RatingLocation;
