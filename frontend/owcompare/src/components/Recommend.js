import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Hero from './Hero';

class Recommend extends Component {
  state = {
    position: 0,
  };

  shouldComponentUpdate(nextProps, nextState) {
    const updatedHeroList = this.props.selectedHeroes !== nextProps.selectedHeroes;
    const updatedPosition = this.state.position !== nextState.position;
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
    let newPosition = this.state.position;
    newPosition = newPosition >= 5 ? 0 : newPosition + 1;
    this.setState({ position: newPosition });
  };

  prevHero = () => {
    let newPosition = this.state.position;
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
          <div className="recommend-wrapper">
            <Hero recommended hero={hero} />
            <div className="recommend-buttons">
              <button className="btn btn-left" onClick={() => this.prevHero()}>
                {' '}
                ◄{' '}
              </button>
              <button className="btn btn-right" onClick={() => this.nextHero()}>
                {' '}
                ►{' '}
              </button>
            </div>
          </div>
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
