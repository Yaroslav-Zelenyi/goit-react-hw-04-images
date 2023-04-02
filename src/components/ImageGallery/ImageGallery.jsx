import { useState, useEffect } from 'react';
import { getImages } from 'Services/getImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export function ImageGallery({ query, currentPage, onFetchComplete }) {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});

  const handleKeyDown = event => {
    if (event.currentTarget === event.target || event.code === 'Escape')
      setIsModalOpen(s => !s);
  };
  const handleImageClick = id => {
    setLoading(true);
    const image = images.find(image => image.id === id);
    const imageInfo = {
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    };
    setSelectedImage(imageInfo);
    setIsModalOpen(true);
    setLoading(false);
  };

  useEffect(() => {
    if (!query.trim()) {
      return;
    }
    setLoading(true);
    getImages(query, currentPage)
      .then(data => {
        if (currentPage === 1) {
          setImages([...data.hits]);
        } else {
          setImages(s => [...s, ...data.hits]);
        }
        onFetchComplete(data.hits);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [query, currentPage, onFetchComplete]);

  return (
    <ul className={css.gallery}>
      {images.map(item => (
        <ImageGalleryItem
          image={item}
          key={item.id}
          onClick={() => handleImageClick(item.id)}
        />
      ))}
      {isLoading && <Loader />}
      {isModalOpen && <Modal image={selectedImage} onClick={handleKeyDown} />}
    </ul>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  onFetchComplete: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
