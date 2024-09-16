import { selectLocationFilter } from '../../redux/filters/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { changeLocationFilter } from '../../redux/filters/slice';
import sprite from '../../assets/icons.svg';
import clsx from 'clsx';
import styles from './LocationPickList.module.css';

const LocationPickList = () => {
  const dispatch = useDispatch();
  const locationFilter = useSelector(selectLocationFilter);

  const buildIconClass = () => {
    return clsx(styles.mapIcon, locationFilter === '' && styles.defaultOption);
  };

  const handleChange = evt => {
    dispatch(changeLocationFilter(evt.target.value));
  };

  return (
    <div className={styles.locationFilterContainer}>
      <svg width="20" height="20" className={buildIconClass()}>
        <use href={`${sprite}#icon-map`} />
      </svg>
      <input
        onChange={handleChange}
        placeholder="City"
        className={styles.filterInput}
      ></input>
    </div>
  );
};

export default LocationPickList;
