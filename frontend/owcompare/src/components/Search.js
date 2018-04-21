import React, { Component, Fragment } from 'react';

const Hero = (props) => (
  <li>{props.hero.name}</li>
);

class Search extends Component {
  heroList = hero => (
    <li key={hero} >{this.props.heroes[hero].name}</li>
  )

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.search === '') return

    console.log(this);

    // TODO: handle refs and update selected hero with input (or 1st value)
  }

  render() {
    let filteredHeroes = Object.keys(this.props.heroes).filter(
      (hero) => {
        if (this.props.search === '') return '';
        return this.props.heroes[hero].name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1;
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
