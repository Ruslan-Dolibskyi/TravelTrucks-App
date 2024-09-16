import RatingBar from '../RatingBar/RatingBar';
import styles from './CamperReviews.module.css';

const CamperReviews = ({ reviews = [] }) => {
  return (
    <ul className={styles.reviewsContainer}>
      {reviews.map((review, index) => (
        <li key={index} className={styles.reviewItem}>
          <div className={styles.singleReviewContainer}>
            <div className={styles.reviewHeader}>
              <div className={styles.iconDiv}>
                <p>{review.reviewer_name?.charAt(0) || 'N'}</p>
              </div>
              <div className={styles.nameDiv}>
                <p>{review.reviewer_name || 'Anonymous'}</p>
                <RatingBar rating={review.reviewer_rating || 0} />
              </div>
            </div>
            <p className={styles.comment}>
              {review.comment || 'No comment provided'}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CamperReviews;
