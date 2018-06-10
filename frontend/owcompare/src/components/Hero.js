import React from 'react';
import PropTypes from 'prop-types';

const Hero = props => <img className="hero-img" src={props.hero.img} alt={props.hero.name} />;

Hero.propTypes = {
  hero: PropTypes.object.isRequired,
};

export default Hero;
