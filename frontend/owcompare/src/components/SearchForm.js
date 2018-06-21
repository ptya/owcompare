import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SEARCHBAR_HEIGHT, SEARCH_WIDTH } from '../utils/style-utils';

const StyledDiv = styled.div`
  position: relative;
  z-index: 999;
`;

const StyledForm = styled.form`
  position: absolute;
  width: 100%;
  text-align: center;
  top: -${SEARCHBAR_HEIGHT / 2}px;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  height: ${SEARCHBAR_HEIGHT}px;
  width: ${SEARCH_WIDTH}px;
  margin: auto;
  padding-left: 25px;
`;

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
    <StyledDiv>
      <StyledForm id="search" onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          innerRef={searchRef}
          value={lastSearch}
          placeholder="Start typing a hero's name.."
          onChange={updateSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {props.children}
      </StyledForm>
    </StyledDiv>
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
