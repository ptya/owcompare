import React, { Component, Fragment } from 'react';
import heroes from '../data/heroes';
import selectedHeroes from '../data/selectedHeroes';

import Search from './Search';
import Selection from './Selection';

class App extends Component {
  state = {
    availableHeroes: heroes,
    search: '',
    selectedHeroes,
    nextSlot: 1
  };

  updateSearch = e => {
    this.setState({ search: e.target.value })
  }
  
  updateSelected = id => {
    let nextSlot = this.state.nextSlot;
    if (nextSlot <= 6) {
      const hero = heroes[id];
      console.log('i am update');
      console.log(id);
      console.log(hero);
      const toUpdate = `hero${nextSlot}`;
      const selectedHeroes = this.state.selectedHeroes;
      let heroToUpdate = selectedHeroes[toUpdate];
      console.log('to update:');
      console.log(heroToUpdate);
      selectedHeroes[toUpdate] = { ...hero };
      nextSlot++;
      this.setState({ nextSlot });
      this.setState({ selectedHeroes });
      const availableHeroes = this.state.availableHeroes;
      delete availableHeroes[id];
      this.setState({ availableHeroes });
    } else {
      return
    }
  }

  render() {
    const availableSpace = this.state.nextSlot <= 6;
    
    return (
      <Fragment>
        <Selection selectedHeroes={this.state.selectedHeroes} />
        { availableSpace &&
          <Search availableHeroes={this.state.availableHeroes} search={this.state.search} updateSearch={this.updateSearch} updateSelected={this.updateSelected} />
        }
      </Fragment>
    );
  }
}

export default App;
