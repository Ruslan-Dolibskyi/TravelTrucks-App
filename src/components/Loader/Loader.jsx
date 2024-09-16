import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader color={'#123abc'} loading={true} size={50} />
    </div>
  );
};

export default Loader;
