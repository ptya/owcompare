import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import SearchForm from './SearchForm';
import CustomScrollbar from './CustomScrollbar';
import SearchItem from './SearchItem';

class Search extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { search, availableHeroes } = nextProps;
    let { filteredHeroes, lastSearch } = prevState;
    if (search !== lastSearch) {
      const cursor = 0;
      lastSearch = search;
      filteredHeroes = Object.keys(availableHeroes)
        .sort()
        .filter(hero => {
          if (search === '') return '';
          return (
            availableHeroes[hero].name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            availableHeroes[hero].id.toLowerCase().indexOf(search.toLowerCase()) !== -1
          );
        });
      return {
        ...prevState,
        cursor,
        filteredHeroes,
        lastSearch,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
    this.activeRef = React.createRef();
    this.resultsRef = React.createRef();
  }

  state = {
    cursor: 0,
    filteredHeroes: [],
    lastSearch: null,
    toHide: true,
  };

  componentDidUpdate() {
    // only try to focus if the element is present and the results
    // should not be hidden
    const { toHide } = this.state;
    if (this.searchRef.current && !toHide) {
      this.searchRef.current.focus();
    }
    // Check if active item is visible and if not scroll accordingly
    const active = this.activeRef.current;
    const results = this.resultsRef.current;
    if (active && results.$container) {
      const activeBounding = active.getBoundingClientRect();
      const resultsBounding = results.$container.getBoundingClientRect();
      if (Math.floor(activeBounding.bottom) > Math.floor(resultsBounding.bottom)) {
        results.scrollbar.scrollIntoView(active, { alignToTop: false });
      } else if (Math.ceil(activeBounding.top) < Math.ceil(resultsBounding.top)) {
        results.scrollbar.scrollIntoView(active, { alignToTop: true });
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { filteredHeroes, cursor } = this.state;
    const { updateSelected } = this.props;
    if (filteredHeroes.length > 0) {
      updateSelected(filteredHeroes[cursor]);
    }
  };

  handleClick = heroId => {
    const { updateSelected } = this.props;
    updateSelected(heroId);
  };

  handleFocus = () => {
    this.setState({ toHide: false });
  };

  handleBlur = () => {
    const { filteredHeroes } = this.state;
    // if intentionally clicked outside, hide the search results
    // else bring back the focus to the input field
    if (filteredHeroes.length > 0) {
      this.setState({ toHide: true });
    } else {
      this.searchRef.current.focus();
    }
  };

  handleHover = i => {
    this.setState({ cursor: i });
  };

  handleKeyDown = e => {
    if (e.keyCode === 38) {
      // Arrow up
      e.preventDefault();
      const { lastSearch } = this.state;
      const len = lastSearch.length * 2; // Opera sometimes sees a carriage return as 2 characters
      this.searchRef.current.setSelectionRange(len, len);
    }
    const { cursor, filteredHeroes } = this.state;
    const listLength = filteredHeroes.length;
    if (e.keyCode === 40 && cursor < listLength - 1) {
      // Arrow down
      this.setState({ cursor: cursor + 1 });
    } else if (e.keyCode === 38 && cursor > 0) {
      // Arrow up
      this.setState({ cursor: cursor - 1 });
    }
  };

  render() {
    const { filteredHeroes, toHide, lastSearch, cursor } = this.state;
    const { availableHeroes, updateSearch, err, selectedHeroes, slots } = this.props;
    const availableSpace = Object.keys(selectedHeroes).length < slots;

    const listLength = filteredHeroes.length;
    const heroToShow = listLength > 0;

    return (
      <Fragment>
        {availableSpace && (
          <SearchForm
            err={err}
            handleBlur={this.handleBlur}
            handleClick={this.handleClick}
            handleFocus={this.handleFocus}
            handleKeyDown={this.handleKeyDown}
            handleSubmit={this.handleSubmit}
            lastSearch={lastSearch}
            searchRef={this.searchRef}
            updateSearch={updateSearch}
          >
            {heroToShow && (
              <CustomScrollbar
                universal
                reference={this.resultsRef}
                listLength={listLength}
                toHide={toHide}
              >
                {filteredHeroes.map((hero, i) => (
                  <SearchItem
                    handleClick={this.handleClick}
                    handleHover={this.handleHover}
                    hero={hero}
                    i={i}
                    isActive={cursor === i}
                    key={i}
                    reference={cursor === i ? this.activeRef : i}
                  >
                    {availableHeroes[hero].name}
                  </SearchItem>
                ))}
              </CustomScrollbar>
            )}
          </SearchForm>
        )}
      </Fragment>
    );
  }
}

Search.propTypes = {
  availableHeroes: PropTypes.object.isRequired,
  err: PropTypes.bool.isRequired,
  selectedHeroes: PropTypes.object.isRequired,
  slots: PropTypes.number.isRequired,
  updateSearch: PropTypes.func.isRequired,
  updateSelected: PropTypes.func.isRequired,
};

export default Search;
