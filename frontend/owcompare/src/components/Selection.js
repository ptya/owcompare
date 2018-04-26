import React, { Component } from 'react';

class Selection extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const updatedHeroList = this.props.selectedHeroes !== nextProps.selectedHeroes;
    return updatedHeroList;
  }

  componentDidUpdate() {
    console.log('helloo');
  }

  heroList = (hero, i) => {
    const selectedHero = this.props.selectedHeroes[hero];
    return (
      <li key={hero}>
        <span>
          {selectedHero['name']}
        </span>
        <button onClick={() => this.props.removeSelected(hero) }>&times;</button>
      </li>
    )
  }

  render() {
    const heroCount = Object.keys(this.props.selectedHeroes).length;
    const defaultHero = [];
    for (let i = 0; i < (6 - heroCount); i++) {
      defaultHero.push(
        (<li key={i}>Nyema</li>)
      )
    }

    return (
      <ul>
        {Object.keys(this.props.selectedHeroes).map(this.heroList)}
        {defaultHero}
      </ul>
    );
  }
}

export default Selection;
