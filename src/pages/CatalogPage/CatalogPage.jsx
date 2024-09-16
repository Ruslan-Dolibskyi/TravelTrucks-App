import CampersList from '../../components/CampersList/CampersList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCampers } from '../../redux/campers/operations';
import LocationPicklist from '../../components/LocationPickList/LocationPickList';
import Filters from '../../components/Filters/Filters';
import { applyFilters } from '../../redux/filters/slice';
import { changeCurrentPage } from '../../redux/campers/slice';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(applyFilters());
    dispatch(changeCurrentPage(1));
    dispatch(fetchCampers());
  };

  return (
    <main className={styles.catalogPage}>
      <div className={styles.filtersSection}>
        <div className={styles.locationFilter}>
          <p className={styles.filterLabel}>Location</p>
          <LocationPicklist />
        </div>
        <div className={styles.featureFilters}>
          <p>Filters</p>
          <Filters
            title="Vehicle equipment"
            filters={['AC', 'Automatic', 'Kitchen', 'TV', 'Bathroom']}
            onlyOneItem={false}
          />
          <Filters
            title="Vehicle type"
            filters={['Van', 'Fully Integrated', 'Alcove']}
            onlyOneItem={true}
          />
        </div>
        <button className={styles.searchButton} onClick={handleClick}>
          Search
        </button>
      </div>
      <CampersList />
    </main>
  );
};

export default CatalogPage;
