import React from 'react';

const Hero = (props) => {
  const heroId = props.recommendedHeroes[props.position];
  const hero = props.allHeroes[heroId];
  console.log(hero);
  return <img src={hero['img']} alt={hero['name']} />
}

export default Hero;
