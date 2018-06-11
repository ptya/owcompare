import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
  display: ${props => (props.recommended ? 'block' : 'initial')};
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

const Hero = props => (
  <Img recommended={props.recommended} src={props.hero.img} alt={props.hero.name} />
);

Hero.defaultProps = {
  recommended: false,
};

Hero.propTypes = {
  hero: PropTypes.object.isRequired,
  recommended: PropTypes.bool,
};

export default Hero;
