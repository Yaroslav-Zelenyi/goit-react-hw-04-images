import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';
export function Button({ clickHandler }) {
  return (
    <button className={css.button} onClick={clickHandler}>
      Load more
    </button>
  );
}

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};
