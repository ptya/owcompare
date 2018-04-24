import React, { Component } from 'react';

class Selection extends Component {
  heroList = (hero, i) => {
    const selectedHero = this.props.selectedHeroes[hero];
    console.log(hero);
    console.log(selectedHero);
    console.log(selectedHero['name']);
    return <li key={hero}>{selectedHero['name']}</li>
  }

  /*heroList = () => {
    let selected = [];
    for (let i = 0; i < this.props.requiredHeroes; i++) {
      if this.props.selectedHeroes[i]
    }
  }*/
  

  render() {
    //let translatedHeroes = this.props.selectedHeroes.map(
    //  this.heroList
    //)
    return (
      <ul>
        {Object.keys(this.props.selectedHeroes).map(this.heroList)}
      </ul>
    );
  }
}

export default Selection;
