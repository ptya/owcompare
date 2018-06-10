import React, { Fragment } from 'react';

import Compare from './Compare';

const App = () => (
  <Compare>
    {(
      allHeroes,
      availableHeroes,
      points,
      search,
      selectedHeroes,
      slots,
      updateSearch,
      updateSelected,
      removeSelected
    ) => (
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
        <Compare.Recommend selectedHeroes={selectedHeroes} allHeroes={allHeroes} points={points} />
      </Fragment>
    )}
  </Compare>
);

export default App;
