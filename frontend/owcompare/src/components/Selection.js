import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Hero from './Hero';

import { MAXHEIGHT, MAXWIDTH } from '../utils/style-utils';

const StyledButton = styled.button`
  position: absolute;
  right: 0;
  &:hover {
    cursor: pointer;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-width: ${MAXWIDTH}vw;
  height: ${Math.round(MAXHEIGHT / 3)}vh;
  background: red;
  justify-content: flex-start;
`;

const StyledLi = styled.li`
  flex-basis: ${MAXWIDTH / 3}%;
  flex-grow: 0;
  position: relative;
  /* //padding: 2px; */
  background: yellow;
  height: 50%;
`;

class Selection extends Component {
  shouldComponentUpdate(nextProps) {
    const { selectedHeroes } = this.props;
    const updatedHeroList = selectedHeroes !== nextProps.selectedHeroes;
    return updatedHeroList;
  }

  heroList = hero => {
    const { selectedHeroes, removeSelected } = this.props;
    const selectedHero = selectedHeroes[hero];
    return (
      <StyledLi key={hero}>
        <Hero hero={selectedHero} />
        <StyledButton onClick={() => removeSelected(hero)}>&times;</StyledButton>
      </StyledLi>
    );
  };

  unassigned = (e, i) => <StyledLi key={i}>Empty</StyledLi>;

  render() {
    const { selectedHeroes, slots } = this.props;
    const selectedNumber = Object.keys(selectedHeroes).length;
    const isAvailable = selectedNumber < slots;
    const remaining = slots - selectedNumber;

    return (
      <StyledUl>
        {Object.keys(selectedHeroes).map(this.heroList)}
        {isAvailable && [...Array(remaining)].map(this.unassigned)}
      </StyledUl>
    );
  }
}

Selection.propTypes = {
  selectedHeroes: PropTypes.object.isRequired,
  slots: PropTypes.number.isRequired,
  removeSelected: PropTypes.func.isRequired,
};

export default Selection;
