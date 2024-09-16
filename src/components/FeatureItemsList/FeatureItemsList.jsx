import FeatureItem from '../FeatureItem/FeatureItem';
import styles from './FeatureItemsList.module.css';

const FeatureItemsList = ({ data, adjustColor = false }) => {
  return (
    <div className={styles.featureItems}>
      <FeatureItem
        value="icon-transmission"
        label={data.transmission}
        adjustColor={adjustColor}
      />
      <FeatureItem
        value="icon-fuel-pump"
        label={data.engine}
        adjustColor={adjustColor}
      />
      {data.AC && (
        <FeatureItem value="icon-ac" label="AC" adjustColor={adjustColor} />
      )}
      {data.kitchen && (
        <FeatureItem
          value="icon-cup-hot"
          label="kitchen"
          adjustColor={adjustColor}
        />
      )}
      {data.TV && (
        <FeatureItem value="icon-tv" label="TV" adjustColor={adjustColor} />
      )}
      {data.radio && (
        <FeatureItem
          value="icon-radio"
          label="radio"
          adjustColor={adjustColor}
        />
      )}
    </div>
  );
};

export default FeatureItemsList;
