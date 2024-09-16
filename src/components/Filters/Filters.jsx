import {
  selectTypeFilter,
  selectEquipmentFilter,
} from '../../redux/filters/selectors';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeTypeFilter,
  changeEquipmentFilter,
} from '../../redux/filters/slice';
import sprite from '../../assets/icons.svg';
import clsx from 'clsx';
import styles from './Filters.module.css';

const Filters = ({ title, filters, onlyOneItem }) => {
  const labelToValue = {
    AC: 'icon-ac',
    Automatic: 'icon-transmission',
    Kitchen: 'icon-cup-hot',
    TV: 'icon-tv',
    Bathroom: 'icon-water',
    Van: 'panelTruck',
    'Fully Integrated': 'fullyIntegrated',
    Alcove: 'alcove',
  };

  const dispatch = useDispatch();
  const typeFilter = useSelector(selectTypeFilter);
  const equipmentFilter = useSelector(selectEquipmentFilter);

  const buildButtonClass = currentFilter => {
    if (onlyOneItem) {
      return clsx(
        styles.filterItem,
        typeFilter === currentFilter && styles.selected,
      );
    } else {
      return clsx(
        styles.filterItem,
        equipmentFilter.includes(currentFilter) && styles.selected,
      );
    }
  };

  const handleClick = currentFilter => {
    if (onlyOneItem) {
      if (typeFilter === currentFilter) {
        dispatch(changeTypeFilter(''));
      } else {
        dispatch(changeTypeFilter(currentFilter));
      }
    } else {
      if (equipmentFilter.includes(currentFilter)) {
        dispatch(
          changeEquipmentFilter(
            equipmentFilter.filter(filter_i => filter_i !== currentFilter),
          ),
        );
      } else {
        dispatch(changeEquipmentFilter([...equipmentFilter, currentFilter]));
      }
    }
  };

  return (
    <div className={styles.filtersContainer}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.separatorLine}></div>
      <ul className={styles.filters}>
        {filters.map((filter, index) => (
          <li key={index}>
            <button
              className={buildButtonClass(labelToValue[filter])}
              onClick={() => handleClick(labelToValue[filter])}
            >
              <svg width="32" height="32">
                <use href={`${sprite}#${labelToValue[filter]}`} />
              </svg>
              <p className={styles.filterItemTitle}>{filter}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
