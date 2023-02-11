import { useState } from 'react';
import css from '../Searchbar/Searchbar.module.css';
import { MdManageSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SearchForm = ({ searchQuery, onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.warn('Веддіть текст пошуку');
      return;
    }
    onSubmit(searchQuery);
    this.reset();
  };

  const reset = () => {
    setSearchQuery('');
  };

  return (
    <header>
      <form className={css.formStyle} onSubmit={handleSubmit}>
        <input
          className={css.input}
          onChange={handleChange}
          type="text"
          value={searchQuery}
          autoComplete="off"
          placeholder="Search images and photos"
          autoFocus
        />
        <button className={css.buttonSearch} type="submit">
          <MdManageSearch
            className={css.svg}
            style={{ width: '30px', height: '30px' }}
          />
        </button>
      </form>
    </header>
  );
};
