import React, { Component, Fragment } from 'react';

import Compare from './Compare';

class App extends Component {
  render() {
    // const availableSpace = Object.keys(this.state.selectedHeroes).length < this.state.slots;

    return (
      <Compare>
      {
        (allHeroes,
        availableHeroes,
        recommendedHeroes,
        search,
        selectedHeroes,
        updateSearch,
        updateSelected,
        removeSelected) => (
          <Fragment>
            <Compare.Selection
              selectedHeroes={selectedHeroes}
              removeSelected={removeSelected}
            />
            <Compare.Search
              availableHeroes={availableHeroes}
              search={search}
              updateSelected={updateSelected}
              updateSearch={updateSearch}
            />
            <Compare.Recommend
              recommendedHeroes={recommendedHeroes}
              allHeroes={allHeroes}
            />
          </Fragment>
        )
      }
      </Compare>
    );
  }
}

export default App;
