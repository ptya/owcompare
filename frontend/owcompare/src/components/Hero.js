import React from 'react';

const Hero = (props) => {
  return <img className='hero-img' src={props.hero['img']} alt={props.hero['name']} />
}

export default Hero;
