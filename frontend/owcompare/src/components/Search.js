import React, { Component, Fragment } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }

  state = {
    toHide: true,
    filteredHeroes: [],
    cursor: 0,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { search, availableHeroes } = nextProps
    const filteredHeroes = Object.keys(availableHeroes).sort().filter(
      (hero) => {
        if (search === '') return '';
        return availableHeroes[hero]
                .name
                .toLowerCase()
                .indexOf(search.toLowerCase()) !== -1;
      }
    );

    return {
      ...prevState,
      filteredHeroes,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.setState({ cursor: 0 })
    }
    // only try to focus if the element is present and the results
    // should not be hidden
    const {toHide} = this.state;
    if (this.searchRef.current && !toHide) {
      this.searchRef.current.focus();
    }
  }

  heroList = (hero, i) => {
    const { cursor } = this.state;
    let listItemClass = ['search-list-item'];
    if(cursor === i) {
      listItemClass.push('active');
    }
    return (
      <li
        className={ listItemClass.join(' ') }
        key={i}
        ref={i}
        id={hero}
        onMouseDown={this.handleClick.bind(this, hero)}
        onMouseOver={this.handleHover.bind(this, i)}
      >
        {this.props.availableHeroes[hero].name}
      </li>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {filteredHeroes, cursor} = this.state;
    if (filteredHeroes.length > 0) {
      this.props.updateSelected(filteredHeroes[cursor]);
    }
  }

  handleClick = (heroId) => {
    this.props.updateSelected(heroId);
  }

  handleFocus = () => {
    this.setState({ toHide: false });
  }

  handleBlur = () => {
    const {filteredHeroes} = this.state;
    // if intentionally clicked outside, hide the search results
    // else bring back the focus to the input field
    if (filteredHeroes.length > 0) {
      this.setState({ toHide: true });
    } else {
      this.searchRef.current.focus();
    }
  }

  handleHover = (i) => {
    this.setState( { cursor: i });
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 38) { // Arrow up
      e.preventDefault();
      const len = this.props.search.length * 2 // Opera sometimes sees a carriage return as 2 characters
      this.searchRef.current.setSelectionRange(len, len);
    }
    const {cursor, filteredHeroes} = this.state;
    const listLength = filteredHeroes.length;
    if (e.keyCode === 40 && cursor < listLength - 1 ) { // Arrow down
      this.setState({ cursor: cursor + 1 });
    } else if (e.keyCode === 38 && cursor > 0) { // Arrow up
      this.setState({ cursor: cursor - 1 });
    }
  }

  render() {
    const {filteredHeroes, toHide} = this.state;
    const heroToShow = filteredHeroes.length > 0;
    const availableSpace = Object.keys(this.props.selectedHeroes).length < this.props.slots;

    let searchListClass = ['search-list'];
    if(toHide) {
      searchListClass.push('hidden');
    }
    // TODO: limit the list result to 10 and scroll for the rest
    // TODO: search should work with ids as well as names
    // TODO: if none selected, remove recommended

    return (
      <Fragment>
        { availableSpace &&
          <div className='search-wrapper' >
            <form id='search' className='search' onSubmit={this.handleSubmit} >
              <input
                className='search-bar'
                type='text'
                ref={this.searchRef}
                value={this.props.search}
                placeholder="Start typing a hero's name.."
                onChange={this.props.updateSearch}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                autoFocus={true}
              />
              { heroToShow &&
                <ul className={ searchListClass.join(' ') }>
                  {filteredHeroes.map(this.heroList)}
                </ul>
              }
            </form>
          </div>
        }
      </Fragment>
    );
  }
}

export default Search;
