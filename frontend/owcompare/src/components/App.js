import React, { Component, Fragment } from 'react';
import heroes from '../data/heroes';

import Search from './Search';
import Selection from './Selection';
import Recommend from './Recommend';

import { getRandomPoints } from '../helper';

class App extends Component {
  state = {
    allHeroes: heroes,
    availableHeroes: heroes,
    recommendedHeroes: [],
    search: '',
    selectedHeroes: {},
    slots: 6,
    points: getRandomPoints(),
  };

  //componentDidMount() {
  //  getRandomPoints();
  //}

  updateSearch = e => {
    const prevSearch = { ...this.state.search };
    const nextSearch = e.target.value;
    if (nextSearch === '') {
      this.setState({ search: nextSearch });
    } else {
      const filteredHeroes = Object.keys(this.state.availableHeroes).filter(
        (hero) => {
          return this.state.availableHeroes[hero].name.toLowerCase().indexOf(nextSearch.toLowerCase()) !== -1;
        }
      );
      (filteredHeroes.length > 0) ? this.setState({ search: nextSearch }) : this.setState({ prevSearch });
    }
    // TODO: search input go back to earliest result after adding a hero so it's not stuck
  }

  updateSelected = key => {
    const selectedHeroes = { ...this.state.selectedHeroes };
    if (Object.keys(selectedHeroes).length < this.state.slots) {
      // add selected hero to state
      const availableHeroes = { ...this.state.availableHeroes };
      const hero = availableHeroes[key];
      selectedHeroes[key] = { ...hero };
      this.setState({ selectedHeroes });

      // remove selected hero from availableHeroes
      delete availableHeroes[key];
      this.setState({ availableHeroes });

      // reset search bar
      this.setState({ search: '' });

      // update recommendedHeroes list
      const calculatedHeroes = {};
      Object.entries(selectedHeroes).forEach(([key, val]) => {
        const hero = this.state.points[key];
        Object.entries(hero).forEach(([key,val]) => {
          calculatedHeroes[key] = calculatedHeroes[key] + val || val;
        });
      })
      const heroesSorted = Object.keys(calculatedHeroes).sort(function(a,b){ return calculatedHeroes[b]-calculatedHeroes[a]}).slice(0,6);
      this.setState({ recommendedHeroes: heroesSorted });

    } else {
      return
    }
  }

  removeSelected = key => {
    const selectedHeroes = { ...this.state.selectedHeroes };
    const availableHeroes = { ...this.state.availableHeroes };
    const hero = selectedHeroes[key];

    delete selectedHeroes[key];
    this.setState({ selectedHeroes });

    availableHeroes[key] = { ...hero };
    this.setState({ availableHeroes });
  }

  render() {
    const availableSpace = Object.keys(this.state.selectedHeroes).length < this.state.slots;

    return (
      <Fragment>
        <Selection
          selectedHeroes={this.state.selectedHeroes}
          removeSelected={this.removeSelected}
        />
        { availableSpace &&
          <Search
            availableHeroes={this.state.availableHeroes}
            search={this.state.search}
            updateSearch={this.updateSearch}
            updateSelected={this.updateSelected}
          />
        }
        <Recommend recommendedHeroes={this.state.recommendedHeroes} allHeroes={this.state.allHeroes}/>
      </Fragment>
    );
  }
}

export default App;
