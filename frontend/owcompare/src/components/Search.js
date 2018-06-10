import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

class Search extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { search, availableHeroes } = nextProps;
    let { cursor, filteredHeroes, lastSearch } = prevState;
    if (search !== lastSearch) {
      cursor = 0;
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
    if (active && results.container) {
      const activeBounding = active.getBoundingClientRect();
      const resultsBounding = results.container.getBoundingClientRect();
      if (Math.floor(activeBounding.bottom) > Math.floor(resultsBounding.bottom)) {
        active.scrollIntoView(false);
      } else if (Math.ceil(activeBounding.top) < Math.ceil(resultsBounding.top)) {
        active.scrollIntoView(true);
      }
    }
  }

  heroList = (hero, i) => {
    const { cursor } = this.state;
    const listItemClass = ['search-list-item'];
    if (cursor === i) {
      listItemClass.push('active');
    }
    return (
      <button
        className={listItemClass.join(' ')}
        key={i}
        ref={cursor === i ? this.activeRef : i}
        id={hero}
        onMouseDown={() => this.handleClick(hero)}
        onMouseOver={() => this.handleHover(i)}
        onFocus={() => this.handleHover(i)}
      >
        {this.props.availableHeroes[hero].name}
      </button>
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const { filteredHeroes, cursor } = this.state;
    if (filteredHeroes.length > 0) {
      this.props.updateSelected(filteredHeroes[cursor]);
    }
  };

  handleClick = heroId => {
    this.props.updateSelected(heroId);
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
      const len = this.state.lastSearch.length * 2; // Opera sometimes sees a carriage return as 2 characters
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
    const { filteredHeroes, toHide, lastSearch } = this.state;
    const heroToShow = filteredHeroes.length > 0;
    const availableSpace = Object.keys(this.props.selectedHeroes).length < this.props.slots;

    // TODO: turn over to styled components and base all calculations on css values
    const style = {
      width: '335px',
      height: '240px',
      margin: 'auto',
      borderBottom: '1px solid #ff81002b',
    };
    if (filteredHeroes.length < 8) {
      style.height = filteredHeroes.length * 30;
    }
    if (toHide) {
      style.display = 'none';
    }

    return (
      <Fragment>
        {availableSpace && (
          <div className="search-wrapper">
            <form id="search" className="search" onSubmit={this.handleSubmit}>
              <input
                className="search-bar"
                type="text"
                ref={this.searchRef}
                value={lastSearch}
                placeholder="Start typing a hero's name.."
                onChange={this.props.updateSearch}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
              />
              {heroToShow && (
                <Scrollbars style={style} universal ref={this.resultsRef}>
                  <div className="search-list">{filteredHeroes.map(this.heroList)}</div>
                </Scrollbars>
              )}
            </form>
          </div>
        )}
      </Fragment>
    );
  }
}

Search.propTypes = {
  availableHeroes: PropTypes.object.isRequired,
  selectedHeroes: PropTypes.object.isRequired,
  slots: PropTypes.number.isRequired,
  updateSearch: PropTypes.func.isRequired,
  updateSelected: PropTypes.func.isRequired,
};

export default Search;
