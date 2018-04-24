import React, { Component } from 'react';

class Search extends Component {
  heroList = (hero, i) => (
    <li key={i} ref={i} id={hero}>{this.props.availableHeroes[hero].name}</li>
  )

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.search === '') return
    const firstId = this.refs[0].id;
    this.props.updateSelected(firstId);
  }

  render() {
    let filteredHeroes = Object.keys(this.props.availableHeroes).filter(
      (hero) => {
        if (this.props.search === '') return '';
        return this.props.availableHeroes[hero].name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1;
      }
    );

    return (
      <form onSubmit={this.handleSubmit} >
        <input type='text' ref='name' value={this.props.search} placeholder='Search for a hero..' onChange={this.props.updateSearch}/>
        <ul>
          {filteredHeroes.map(this.heroList)}
        </ul>
      </form>
    );
  }
}

export default Search;
