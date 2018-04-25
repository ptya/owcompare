import React, { Component, Fragment } from 'react';
import heroes from '../data/heroes';
import selectedHeroes from '../data/selectedHeroes';

import Search from './Search';
import Selection from './Selection';
import Recommend from './Recommend';

class App extends Component {
  state = {
    availableHeroes: heroes,
    recommendedHeroes: {},
    search: '',
    selectedHeroes: {},
    slots: 6
  };

  updateSearch = e => {
    const prevSearch = this.state.search;
    const nextSearch = e.target.value;
    if (nextSearch === '') {
      this.setState({ search: nextSearch });
    } else {
      const filteredHeroes = Object.keys(this.state.availableHeroes).filter(
        (hero) => {
          return this.state.availableHeroes[hero].name.toLowerCase().indexOf(nextSearch.toLowerCase()) !== -1;
        }
      );
      (filteredHeroes.length > 0) ? this.setState({ search: nextSearch }) : this.setState({ search: prevSearch });
    }
    // TODO: search input go back to earliest result after adding a hero so it's not stuck
  }

  updateSelected = key => {
    const selectedHeroes = this.state.selectedHeroes;
    if (Object.keys(selectedHeroes).length < this.state.slots) {
      const availableHeroes = this.state.availableHeroes;
      const hero = availableHeroes[key];
      selectedHeroes[key] = { ...hero };
      this.setState({ selectedHeroes });

      delete availableHeroes[key];
      this.setState({ availableHeroes });

      this.setState({ search: '' });

    } else {
      return
    }
  }

  removeSelected = key => {
    const selectedHeroes = this.state.selectedHeroes;
    const availableHeroes = this.state.availableHeroes;
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
        <Recommend />
      </Fragment>
    );
  }
}

export default App;
