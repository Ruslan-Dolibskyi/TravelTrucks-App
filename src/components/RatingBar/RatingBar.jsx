import React from 'react';
import sprite from '../../assets/icons.svg';
import styles from './RatingBar.module.css';

const RatingBar = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <ul className={styles.ratingBarContainer}>
      {stars.map(star => (
        <li key={String(star)}>
          <svg
            width="16"
            height="16"
            className={
              rating >= star ? styles.starColorYellow : styles.starColorGray
            }
          >
            <use href={`${sprite}#icon-star`} />
          </svg>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(RatingBar);
