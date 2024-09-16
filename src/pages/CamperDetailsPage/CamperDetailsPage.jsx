import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCurrentCamper,
  changeOpenFeatures,
} from '../../redux/campers/slice';
import {
  selectCurrentCamper,
  selectOpenFeatures,
} from '../../redux/campers/selectors';
import { fetchCamperById } from '../../redux/campers/operations';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import RatingLocation from '../../components/RatingLocation/RatingLocation';
import CamperFeatures from '../../components/CamperFeatures/CamperFeatures';
import CamperReviews from '../../components/CamperReviews/CamperReviews';
import BookingForm from '../../components/BookingForm/BookingForm';
import clsx from 'clsx';
import styles from './CamperDetailsPage.module.css';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCurrentCamper);
  const featuresOpen = useSelector(selectOpenFeatures);

  useEffect(() => {
    dispatch(fetchCamperById(id));

    return () => {
      dispatch(clearCurrentCamper());
      dispatch(changeOpenFeatures(true));
    };
  }, [id, dispatch]);

  if (!camper || !camper.price || !camper.gallery) return <p>Loading...</p>;

  const toggleFeatureTab = isFeatures => () => {
    dispatch(changeOpenFeatures(isFeatures));
  };

  const buttonClass = active =>
    clsx(styles.invisibleButton, { [styles.withHover]: active });

  return (
    <main className={styles.detailPageContainer}>
      <section className={styles.mainInfo}>
        <header className={styles.mainInfoTitleBlock}>
          <h2 className={styles.title}>{camper.name}</h2>
          <RatingLocation
            rating={camper.rating}
            reviewsCount={camper.reviews.length}
            location={camper.location}
          />
          <p className={clsx(styles.title, styles.price)}>
            &#8364;{camper.price ? camper.price.toFixed(2) : 'N/A'}
          </p>
        </header>
        <ImageGallery images={camper.gallery || []} />
        <p className={styles.description}>{camper.description}</p>
      </section>

      <nav className={styles.subNavigation}>
        <button
          className={buttonClass(featuresOpen)}
          onClick={toggleFeatureTab(true)}
        >
          Features
        </button>
        <button
          className={buttonClass(!featuresOpen)}
          onClick={toggleFeatureTab(false)}
        >
          Reviews
        </button>
      </nav>

      <hr className={styles.separatorLine} />

      <section className={styles.outletContainer}>
        {featuresOpen ? (
          <CamperFeatures data={camper} />
        ) : (
          <CamperReviews reviews={camper.reviews} />
        )}
        <BookingForm camperId={camper.id} />
      </section>
    </main>
  );
};

export default CamperDetailsPage;
