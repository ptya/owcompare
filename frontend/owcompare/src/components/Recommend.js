import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Hero from './Hero';
import { MAXHEIGHT } from '../utils/style-utils';

const StyledWrapper = styled.div`
  height: ${Math.round((MAXHEIGHT / 3) * 2)}vh;
  position: relative;
`;

const StyledFlexDiv = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
`;

const StyledButton = styled.button`
  flex-grow: 1;
  background: none;
  border: none;
  text-align: ${propss => (propss.right ? 'right' : 'left')};
  margin-left: ${propss => (propss.right ? '20%' : '0')};
  margin-right: ${propss => (propss.right ? '0' : '20%')};

  &:hover {
    font-size: 2rem;
    cursor: pointer;
  }
`;

class Recommend extends Component {
  state = {
    position: 0,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { selectedHeroes } = this.props;
    const { position } = this.state;
    const updatedHeroList = selectedHeroes !== nextProps.selectedHeroes;
    const updatedPosition = position !== nextState.position;
    return updatedHeroList || updatedPosition;
  }

  updateRecommendation = () => {
    const { selectedHeroes, points } = this.props;
    if (Object.keys(selectedHeroes).length === 0) return [];

    const calculatedHeroes = {};
    Object.keys(selectedHeroes).forEach(key => {
      const hero = points[key];
      Object.entries(hero).forEach(([k, v]) => {
        calculatedHeroes[k] = calculatedHeroes[k] + v || v;
      });
    });
    const heroesSorted =
      Object.keys(calculatedHeroes)
        .sort((a, b) => calculatedHeroes[b] - calculatedHeroes[a])
        .slice(0, 6) || [];
    return heroesSorted;
  };

  nextHero = () => {
    const { position } = this.state;
    let newPosition = position;
    newPosition = newPosition >= 5 ? 0 : newPosition + 1;
    this.setState({ position: newPosition });
  };

  prevHero = () => {
    const { position } = this.state;
    let newPosition = position;
    newPosition = newPosition <= 0 ? 5 : newPosition - 1;
    this.setState({ position: newPosition });
  };

  render() {
    const recommendedHeroes = this.updateRecommendation();
    const heroToShow = recommendedHeroes.length > 0;
    const { allHeroes } = this.props;
    const { position } = this.state;
    const hero = allHeroes[recommendedHeroes[position]] || '';

    return (
      <Fragment>
        {heroToShow && (
          <StyledWrapper>
            <Hero recommended hero={hero} />
            <StyledFlexDiv>
              <StyledButton onClick={() => this.prevHero()}> ◄ </StyledButton>
              <StyledButton right onClick={() => this.nextHero()}>
                ►
              </StyledButton>
            </StyledFlexDiv>
          </StyledWrapper>
        )}
      </Fragment>
    );
  }
}

Recommend.propTypes = {
  allHeroes: PropTypes.object.isRequired,
  points: PropTypes.object.isRequired,
  selectedHeroes: PropTypes.object.isRequired,
};

export default Recommend;
