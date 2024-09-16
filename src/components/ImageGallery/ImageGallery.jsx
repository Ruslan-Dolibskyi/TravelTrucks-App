import styles from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={styles.imageBlock}>
      {images.map((image_i, index) => (
        <li key={index}>
          <div className={styles.imageContainer}>
            <img
              src={image_i.original}
              alt={image_i.alt || `Image ${index + 1}`}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
