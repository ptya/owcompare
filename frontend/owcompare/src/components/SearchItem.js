import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchItem extends Component {
  render() {
    const { i, hero, isActive, handleClick, handleHover, reference } = this.props;
    return (
      <button
        id={hero}
        ref={reference}
        className={`search-list-item ${isActive ? 'active' : ''}`}
        onMouseDown={() => handleClick(hero)}
        onMouseOver={() => handleHover(i)}
        onFocus={() => handleHover(i)}
      >
        {this.props.children}
      </button>
    );
  }
}

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
