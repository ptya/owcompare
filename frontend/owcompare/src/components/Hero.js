import React from 'react';

const Hero = (props) => {
  console.log(props);
  return <p>Hey {props.recommendedHeroes[props.position]}</p>
}

export default Hero;
