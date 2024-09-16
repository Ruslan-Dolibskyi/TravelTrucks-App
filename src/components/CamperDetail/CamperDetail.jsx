import styles from './CamperDetail.module.css';

const CamperDetail = ({ name, value }) => {
  const valueToLabel = {
    panelTruck: 'Van',
    fullyIntegrated: 'Fully Integrated',
    alcove: 'Alcove',
  };

  const formatValue = (name, value) => {
    if (name === 'Form') return valueToLabel[value];
    if (name === 'Consumption') return value;
    return value.length < 2
      ? value
      : value.slice(0, -1) + ' ' + value.charAt(value.length - 1);
  };

  return (
    <div className={styles.detailItem}>
      <p className={styles.text}>{name}</p>
      <p className={styles.text}>{formatValue(name, value)}</p>
    </div>
  );
};

export default CamperDetail;
