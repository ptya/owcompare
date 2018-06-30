import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  line-height: 16px;
  display: block;
  position: relative;
  padding: 6px 0;
  border: 1px solid rgba(255, 129, 0, 0.17);
  transition: all 0.1s;
  background: ${propss =>
    propss.active ? 'rgba(243, 241, 212, 0.9)' : 'rgba(255, 254, 254, 0.9)'};
  width: 100%;
  ${propss =>
    propss.active &&
    css`
      border: 1px solid rgba(255, 129, 0, 0.4);
      letter-spacing: 1px;
      &:after {
        position: absolute;
        right: 25px;
        content: 'select ⏎';
        /* TODO: MAKE THIS ORANGE LATER */
        color: rgba(111, 111, 111, 0.8);
        font-size: 0.7rem;
        line-height: 1rem;
      }
    `};
`;

const SearchItem = props => {
  const { children, i, hero, isActive, handleClick, handleHover, reference } = props;
  return (
    <StyledButton
      id={hero}
      innerRef={reference}
      active={isActive}
      onMouseDown={() => handleClick(hero)}
      onMouseOver={() => handleHover(i)}
      onFocus={() => handleHover(i)}
    >
      {children}
    </StyledButton>
  );
};

SearchItem.propTypes = {
  children: PropTypes.any.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleHover: PropTypes.func.isRequired,
  hero: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  reference: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
};

export default SearchItem;
