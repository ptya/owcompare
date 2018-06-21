import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = props => {
  const {
    searchRef,
    lastSearch,
    updateSearch,
    handleSubmit,
    handleFocus,
    handleBlur,
    handleKeyDown,
  } = props;

  return (
    <div className="search-wrapper">
      <form id="search" className="search" onSubmit={handleSubmit}>
        <input
          className="search-bar"
          type="text"
          ref={searchRef}
          value={lastSearch}
          placeholder="Start typing a hero's name.."
          onChange={updateSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {props.children}
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  children: PropTypes.any.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  lastSearch: PropTypes.string.isRequired,
  searchRef: PropTypes.object.isRequired,
  updateSearch: PropTypes.func.isRequired,
};

export default SearchForm;
