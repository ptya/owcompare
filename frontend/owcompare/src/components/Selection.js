import React, { Component } from 'react';
import Hero from './Hero';

class Selection extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const updatedHeroList = this.props.selectedHeroes !== nextProps.selectedHeroes;
    return updatedHeroList;
  }

  heroList = (hero, i) => {
    const selectedHero = this.props.selectedHeroes[hero];
    return (
      <li key={hero}>
        <Hero hero={selectedHero}/> 
        <button onClick={() => this.props.removeSelected(hero) }>&times;</button>
      </li>
    )
  }

  render() {

    return (
      <ul>
        {Object.keys(this.props.selectedHeroes).map(this.heroList)}
      </ul>
    );
  }
}

export default Selection;
