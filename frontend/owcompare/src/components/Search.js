import React, { Component } from 'react';

class Search extends Component {
  heroList = (hero, i) => (
    <li className='search-list-item' key={i} ref={i} id={hero}>{this.props.availableHeroes[hero].name}</li>
  )

  handleSubmit = (e) => {
    e.preventDefault();
    if (0 in this.refs && this.props.search !== '') {
      const firstId = this.refs[0].id;
      this.props.updateSelected(firstId);
    } else {
      return
    }
  }

  render() {
    const filteredHeroes = Object.keys(this.props.availableHeroes).sort().filter(
      (hero) => {
        if (this.props.search === '') return '';
        return this.props.availableHeroes[hero].name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1;
      }
    );

    const heroToShow = filteredHeroes.length > 0;

    return (
      <div className='search-wrapper' >
        <form className='search' onSubmit={this.handleSubmit} >
          <input className='search-bar' type='text' ref='name' value={this.props.search} placeholder='Search for a hero..' onChange={this.props.updateSearch}/>
          { heroToShow &&
            <ul className='search-list'>
              {filteredHeroes.map(this.heroList)}
            </ul>
          }
        </form>
      </div>
    );
  }
}

export default Search;
