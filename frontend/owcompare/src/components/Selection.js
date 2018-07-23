import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Hero from './Hero';

import { MAXHEIGHT, MAXWIDTH } from '../utils/style-utils';

const StyledButton = styled.button`
  position: absolute;
  left: 5px;
  top: 5px;
  border: 2px solid rgba(255, 255, 255, 0.75);
  border-radius: 5px;
  background: rgba(64, 82, 117, 0.75);
  color: rgba(255, 255, 255, 0.75);
  padding: 0 0.4em 0 0.4em;
  font-size: 1.5em;
  &:hover {
    cursor: pointer;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-width: ${MAXWIDTH}vw;
  height: ${Math.round(MAXHEIGHT * 0.46)}vh;
  /* background: none; */
  justify-content: flex-start;
`;

const StyledLi = styled.li`
  flex-basis: ${MAXWIDTH / 3}%;
  flex-grow: 0;
  position: relative;
  /* //padding: 2px; */
  background: rgba(255, 255, 255, 0.5);
  height: 50%;
  box-sizing: border-box;
  border: 2px solid #f99e1a;
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
