import { useLocalStorage } from '../LocalStorage';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export function Searchbar({ query }) {
  const [value, setValue] = useLocalStorage('queryValue', ' ');

  const handleSubmit = event => {
    event.preventDefault();
    query(value);
    setValue(' ');
  };

  const handleChageOn = event => {
    setValue(event.target.value.toLowerCase());
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={css.SearchForm_button}
          disabled={value === ''}
        >
          <span className={css.SearchForm_button_label}>Search</span>
        </button>
        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChageOn}
          value={value}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  query: PropTypes.func.isRequired,
};
