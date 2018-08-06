import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCirlce = styled.svg`
  height: ${({ diameter }) => diameter}px;
  width: ${({ diameter }) => diameter}px;
  margin: 15px 5px;
`;

class Circle extends Component {
  static defaultProps = {
    diameter: 20,
    strokeWidth: 2,
    stroke: 'rgba(255,255,255,0.9)',
    filled: false,
  };

  render() {
    const { diameter, strokeWidth, stroke, filled } = this.props;
    const fill = filled ? stroke : 'none';
    return (
      <StyledCirlce diameter={diameter}>
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={diameter / 2 - strokeWidth / 2}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
        />
      </StyledCirlce>
    );
  }
}

Circle.propTypes = {
  diameter: PropTypes.number,
  strokeWidth: PropTypes.number,
  stroke: PropTypes.string,
  filled: PropTypes.bool,
};

export default Circle;
