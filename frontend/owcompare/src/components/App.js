import React, { Component } from 'react';
import heroes from '../data/heroes';

import Search from './Search';

class App extends Component {
  state = {
    search: '',
    selectedHero: {},
  };

  updateSearch = e => {
    this.setState({ search: e.target.value })
    console.log(e.target.value);
  }

  

  render() {
    return (
      <Search heroes={heroes} search={this.state.search} updateSearch={this.updateSearch} />
    );
  }
}

export default App;
