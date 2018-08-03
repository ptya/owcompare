import React from 'react';
import styled from 'styled-components';

import Compare from './Compare';
import baseStyles from '../styles';

const StyledBackground = styled.div`
  background-image: url(images/background2x.png);
  background-size: cover;
  background-color: rgb(44, 36, 89, 0.75);
  height: 100vh;
`;

const App = () => {
  baseStyles();
  return (
    <Compare>
      {(
        allHeroes,
        err,
        availableHeroes,
        points,
        search,
        selectedHeroes,
        slots,
        updateSearch,
        updateSelected,
        removeSelected
      ) => (
        <StyledBackground>
          <Compare.Selection
            selectedHeroes={selectedHeroes}
            removeSelected={removeSelected}
            slots={slots}
          />
          <Compare.Search
            availableHeroes={availableHeroes}
            err={err}
            search={search}
            selectedHeroes={selectedHeroes}
            slots={slots}
            updateSelected={updateSelected}
            updateSearch={updateSearch}
          />
          <Compare.Recommend
            selectedHeroes={selectedHeroes}
            allHeroes={allHeroes}
            points={points}
          />
        </StyledBackground>
      )}
    </Compare>
  );
};

export default App;
