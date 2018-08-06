import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Hero from './Hero';
import { RECOMMEND_HEIGHT } from '../utils/style-utils';

const StyledWrapper = styled.div`
  height: ${RECOMMEND_HEIGHT}vh;
  position: relative;
  overflow: hidden;
`;

const StyledFlexDiv = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  top: 0;
  align-items: ${({ bottom }) => (bottom ? 'flex-end' : 'flex-start')};
  z-index: ${({ bottom }) => (bottom ? 0 : 1)};
`;

const StyledButton = styled.button`
  font-family: 'Astloch', cursive;
  flex-grow: 1;
  background: none;
  height: 100%;
  border: none;
  text-align: ${({ right }) => (right ? 'right' : 'left')};
  margin-left: ${({ right }) => (right ? '20%' : '0')};
  margin-right: ${({ right }) => (right ? '0' : '20%')};
  font-size: 96px;
  color: rgba(249, 158, 26, 0.7);
  text-shadow: -1px -1px 0 rgba(249, 158, 26, 0.7), 1px -1px 0 rgba(249, 158, 26, 0.7),
    -1px 1px 0 rgba(249, 158, 26, 0.7), 1px 1px 0 rgba(249, 158, 26, 0.7);

  &:hover {
    color: rgba(249, 158, 26, 1);
    text-shadow: -1px -1px 0 rgba(249, 158, 26, 1), 1px -1px 0 rgba(249, 158, 26, 1),
      -1px 1px 0 rgba(249, 158, 26, 1), 1px 1px 0 rgba(249, 158, 26, 1);
    cursor: pointer;
  }
`;

const StyledTitle = styled.h1`
  font-family: 'Righteous', cursive;
  font-size: 36px;
  position: absolute;
  top: 1em;
  left: 0;
  right: 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-transform: uppercase;
`;

const StyledName = styled.span`
  font-family: 'Righteous', cursive;
  font-size: 45px;
  height: 45px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
  color: rgba(255,255,255,100);
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
  text-transform: uppercase;
  transform: rotate(-5deg);
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

    console.log(recommendedHeroes);

    return (
      <Fragment>
        {heroToShow && (
          <StyledWrapper>
            <StyledTitle>Your best bet</StyledTitle>
            <Hero recommended hero={hero} />
            <StyledName>{hero.name}</StyledName>
            <StyledFlexDiv>
              <StyledButton onClick={() => this.prevHero()}> &lt; </StyledButton>
              <StyledButton right onClick={() => this.nextHero()}>
                &gt;
              </StyledButton>
            </StyledFlexDiv>
            <StyledFlexDiv bottom>Hey</StyledFlexDiv>
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
