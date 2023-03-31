import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ image, onClick }) {
  return (
    <li className={css.ImageGalleryItem} onClick={onClick}>
      <img
        className={css.ImageGalleryItem_image}
        src={image.webformatURL}
        alt={image.tags}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
