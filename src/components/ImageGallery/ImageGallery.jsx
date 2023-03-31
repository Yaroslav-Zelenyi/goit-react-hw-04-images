import { Component } from 'react';
import { getImages } from 'Services/getImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    images: [],
    query: this.props.query,
    isLoading: false,
    isModalOpen: false,
    selectedImage: {},
  };

  componentDidUpdate(prevProps, _) {
    if (
      this.props.query !== prevProps.query ||
      prevProps.currentPage !== this.props.currentPage
    ) {
      this.setState({ isLoading: true });
      getImages(this.props.query, this.props.currentPage)
        .then(data => {
          if (this.props.currentPage === 1) {
            this.setState({
              images: [...data.hits],
            });
          } else {
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
            }));
          }
          this.props.onFetchComplete(data.hits);
          this.setState({ isLoading: false });
        })
        .catch(error => {
          alert(`Error fetching API: ${error}`);
          this.setState({ isLoading: false });
        });
    }
  }

  handleImageClick = id => {
    const selectedImage = this.state.images.find(image => image.id === id);
    const imageInfo = {
      largeImageURL: selectedImage.largeImageURL,
      tags: selectedImage.tags,
    };
    this.setState({ selectedImage: imageInfo, isModalOpen: true });
  };

  handleKeyDown = event => {
    if (event.currentTarget === event.target || event.code === 'Escape')
      this.setState(state => ({ isModalOpen: !state.isModalOpen }));
  };

  render() {
    const { isLoading, isModalOpen, selectedImage } = this.state;
    return (
      <ul className={css.gallery} onClick={this.windowClose}>
        {this.state.images.map(item => (
          <ImageGalleryItem
            image={item}
            key={item.id}
            onClick={() => this.handleImageClick(item.id)}
          />
        ))}
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal image={selectedImage} onClick={this.handleKeyDown} />
        )}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  onFetchComplete: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
