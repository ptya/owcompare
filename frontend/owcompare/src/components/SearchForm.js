import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { SEARCHBAR_HEIGHT, SEARCH_WIDTH } from '../utils/style-utils';
import { errSearch } from '../styles/KeyFrames';

const StyledDiv = styled.div`
  position: relative;
  z-index: 999;
`;

const StyledForm = styled.form`
  position: absolute;
  width: 100%;
  text-align: center;
  top: calc((${SEARCHBAR_HEIGHT}px + 3rem) / -2);
`;

const StyledInput = styled.input`
  border: 0.5px solid #43484c;
  border-radius: 5px;
  background-color: #218ffe;
  box-shadow: 2px 4px 4px rgba(0,0,0,0.25), inset 0 1px 4px rgba(0,0,0,0.25);
  box-sizing: border-box;
  color: rgba(255, 255, 255, 1);
  font-size: 100%;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.25);
  /* height: ${SEARCHBAR_HEIGHT}px; */
  width: ${SEARCH_WIDTH}px;
  padding: 1.5rem 0 1.5rem 1.5rem;
  ${({ err }) =>
    err &&
    css`
      animation: ${errSearch} 0.5s 0s 1 ease-in-out;
    `};

  ::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const StyledIco = styled.i`
  background-image: url(images/SearchIco.png);
  background-size: cover;
  width: 19px;
  height: 19px;
  display: block;
  position: absolute;
  top: 20px;
  left: ${SEARCH_WIDTH}px;
`;
// TODO: turn this into controlled component completely! https://tylermcginnis.com/react-interview-questions
const SearchForm = props => {
  const {
    children,
    err,
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
          err={err}
          innerRef={searchRef}
          value={lastSearch}
          placeholder="Start typing a hero's name.."
          onChange={updateSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        <StyledIco />
        {children}
      </StyledForm>
    </StyledDiv>
  );
};

SearchForm.propTypes = {
  children: PropTypes.any.isRequired,
  err: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  lastSearch: PropTypes.string.isRequired,
  searchRef: PropTypes.object.isRequired,
  updateSearch: PropTypes.func.isRequired,
};

export default SearchForm;
