import FeatureItemsList from '../FeatureItemsList/FeatureItemsList';
import CamperDetail from '../CamperDetail/CamperDetail';
import styles from './CamperFeatures.module.css';

const CamperFeatures = ({ data }) => {
  return (
    <div className={styles.feturesContainer}>
      <FeatureItemsList data={data} adjustColor={true} />
      <div className={styles.vehicleDetails}>
        <h3 className={styles.detailsTitle}>Vehicle details</h3>
        <div className={styles.separatorLine}></div>
        <div className={styles.vehicleSizesContainer}>
          <CamperDetail name="Form" value={data.form} />
          <CamperDetail name="Length" value={data.length} />
          <CamperDetail name="Width" value={data.width} />
          <CamperDetail name="Height" value={data.height} />
          <CamperDetail name="Tank" value={data.tank} />
          <CamperDetail name="Consumption" value={data.consumption} />
        </div>
      </div>
    </div>
  );
};

export default CamperFeatures;
