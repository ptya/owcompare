import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  display: ${prop => (prop.recommended ? 'block' : 'initial')};
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

const Hero = ({ recommended, hero }) => (
  <Img recommended={recommended} src={hero.img} alt={hero.name} />
);

Hero.defaultProps = {
  recommended: false,
};

Hero.propTypes = {
  hero: PropTypes.object.isRequired,
  recommended: PropTypes.bool,
};

export default Hero;
