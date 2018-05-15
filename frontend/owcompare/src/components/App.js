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
        slots,
        updateSearch,
        updateSelected,
        removeSelected) => (
          <Fragment>
            <Compare.Selection
              selectedHeroes={selectedHeroes}
              removeSelected={removeSelected}
              slots={slots}
              />
            <Compare.Search
              availableHeroes={availableHeroes}
              search={search}
              selectedHeroes={selectedHeroes}
              slots={slots}
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
