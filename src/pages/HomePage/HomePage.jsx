import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewNowClick = () => {
    navigate('/catalog', { replace: true });
  };

  return (
    <main className={styles.heroContainer}>
      <h1 className={styles.heroText}>Campers of your dreams</h1>
      <h2 className={styles.heroSubtitleText}>
        You can find everything you want in our catalog
      </h2>
      <button className={styles.heroBtn} onClick={handleViewNowClick}>
        View Now
      </button>
    </main>
  );
};

export default HomePage;
