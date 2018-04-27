import React, { Component, Fragment } from 'react';

class Recommend extends Component {
  shouldComponentUpdate(nextProps) {
    const updatedHeroList = this.props.selectedHeroes !== nextProps.selectedHeroes;
    return updatedHeroList;
  }

  heroList = (hero) => {
    return <li key={hero}>{hero}</li>
  }

  render() {
    const calculatedHeroes = {};
    Object.entries(this.props.selectedHeroes).forEach(([key, val]) => {
      const hero = this.props.points[key];
      Object.entries(hero).forEach(([key,val]) => {
        calculatedHeroes[key] = calculatedHeroes[key] + val || val;
      });
    })
    const heroesSorted = Object.keys(calculatedHeroes).sort(function(a,b){ return calculatedHeroes[b]-calculatedHeroes[a]}).slice(0,7);

    const heroToShow = heroesSorted.length > 0;

    return (
      <Fragment>
      { heroToShow &&
        <ul>
          {heroesSorted.map(this.heroList)}
        </ul>
      }
      </Fragment>
    );
  }
}

export default Recommend;
