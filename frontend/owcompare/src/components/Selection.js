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
      <li key={hero} className={`flex-item flex-item-${i}`} >
        <Hero hero={selectedHero} />
        <button className='close-btn' onClick={() => this.props.removeSelected(hero) }>&times;</button>
      </li>
    )
  }

  unassigned = (e, i) => {
    const start = Object.keys(this.props.selectedHeroes).length;
    return (
      <li key={i} className={`flex-item flex-item-${i+start} no-hero`}>
        Empty
      </li>
    )
  }

  render() {
    const isAvailable = Object.keys(this.props.selectedHeroes).length < this.props.slots;
    const remaining = this.props.slots - Object.keys(this.props.selectedHeroes).length;

    return (
      <ul className='flex-container'>
        {Object.keys(this.props.selectedHeroes).map(this.heroList)}
        { isAvailable &&
          [...Array(remaining)].map(this.unassigned)
        }
      </ul>
    );
  }
}

export default Selection;
