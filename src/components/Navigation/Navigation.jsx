import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentCamper } from '../../redux/campers/selectors';
import sprite from '../../assets/icons.svg';
import clsx from 'clsx';
import styles from './Navigation.module.css';

const buildLinkClass = (hasId, isActive) => {
  return clsx(styles.link, isActive && !hasId && styles.active);
};

const Navigation = () => {
  const currentCamper = useSelector(selectCurrentCamper);
  const hasId = currentCamper != null;

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.navigationContainer}>
          <div className={styles.logoNavigationContainer}>
            <NavLink to="/">
              <svg width="136" height="16">
                <use href={`${sprite}#icon-logo`} />
              </svg>
            </NavLink>
          </div>
          <div className={styles.textNavigationContainer}>
            <NavLink
              to="/"
              className={({ isActive }) => buildLinkClass(hasId, isActive)}
            >
              Home
            </NavLink>
            <NavLink
              to="/catalog"
              className={({ isActive }) => buildLinkClass(hasId, isActive)}
            >
              Catalog
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
