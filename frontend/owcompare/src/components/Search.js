import React, { Component, Fragment } from 'react';

class Search extends Component {
  state = {
    toHide: true,
  }

  heroList = (hero, i) => (
    <li
      className='search-list-item'
      key={i}
      ref={i}
      id={hero}
      onMouseDown={this.handleClick.bind(this, hero)}
    >
      {this.props.availableHeroes[hero].name}
    </li>
  )

  handleSubmit = (e) => {
    e.preventDefault();
    if (0 in this.refs && this.props.search !== '') {
      const firstHeroId = this.refs[0].id;
      this.props.updateSelected(firstHeroId);
    } else {
      return
    }
  }

  handleClick = (heroId) => {
    this.props.updateSelected(heroId)
  }

  handleFocus = () => {
    this.setState({ toHide: false });
  }

  handleBlur = () => {
    this.setState({ toHide: true });
  }

  render() {
    const filteredHeroes = Object.keys(this.props.availableHeroes).sort().filter(
      (hero) => {
        if (this.props.search === '') return '';
        return this.props.availableHeroes[hero].name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1;
      }
    );

    const heroToShow = filteredHeroes.length > 0;
    const availableSpace = Object.keys(this.props.selectedHeroes).length < this.props.slots;

    let searchListClass = ['search-list'];
    if(this.state.toHide) {
      searchListClass.push('hidden');
    }

    return (
      <Fragment>
        { availableSpace &&
          <div className='search-wrapper' onBlur={this.handleBlur}>
            <form id='search' className='search' onSubmit={this.handleSubmit} >
              <input
                className='search-bar'
                type='text' ref='name'
                value={this.props.search}
                placeholder='Search for a hero..'
                onChange={this.props.updateSearch}
                onFocus={this.handleFocus}

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
