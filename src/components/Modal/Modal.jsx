import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onClick);
  }

  render() {
    return (
      <div className={css.overlay} onClick={this.props.onClick}>
        <div className={css.modal}>
          <img
            src={this.props.image.largeImageURL}
            alt={this.props.image.tags}
            className={css.image}
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
