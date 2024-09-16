import { toTitleCase } from '../../helpers/formatUtils.js';
import sprite from '../../assets/icons.svg';
import clsx from 'clsx';
import styles from './FeatureItem.module.css';

const buildDivClass = adjustColor => {
  return clsx(styles.featureItem, adjustColor && styles.adjustedColor);
};

const FeatureItem = ({ value, label, adjustColor }) => {
  return (
    <div className={buildDivClass(adjustColor)}>
      <svg width="20" height="20">
        <use href={`${sprite}#${value}`} />
      </svg>
      <p>{toTitleCase(label)}</p>
    </div>
  );
};

export default FeatureItem;
