import React, { Component, Fragment } from 'react';
import Hero from './Hero';

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const updatedHeroList = this.props.recommendedHeroes !== nextProps.recommendedHeroes;
    const updatedPosition = this.state.position !== nextState.position;
    return updatedHeroList || updatedPosition;
  }

  nextHero = () => {
    let newPosition = this.state.position;
    newPosition = newPosition >= 5 ? 0 : newPosition + 1;
    this.setState({ position: newPosition });
  }

  prevHero = () => {
    let newPosition = this.state.position;
    newPosition = newPosition <= 0 ? 5 : newPosition - 1;
    this.setState({ position: newPosition });
  }

  render() {
    const heroToShow = this.props.recommendedHeroes.length > 0;

    return (
      <Fragment>
        { heroToShow &&
          <Fragment>
            <button onClick={ () => this.prevHero() }> ◄ </button>
            <Hero position={this.state.position} recommendedHeroes={this.props.recommendedHeroes} />
            <button onClick={ () => this.nextHero() }> ► </button>
          </Fragment>
        }
      </Fragment>
    );
  }
}

export default Recommend;
