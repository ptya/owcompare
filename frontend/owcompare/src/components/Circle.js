import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Circle extends Component {
  static defaultProps = { diameter: 100, strokeWidth: 3, stroke: 'black', fill: 'none' };

  render() {
    const { diameter, strokeWidth, stroke, fill } = this.props;
    return (
      <svg height={diameter} width={diameter}>
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          r={diameter - 2 * strokeWidth}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
        />
      </svg>
    );
  }
}

Circle.propTypes = {
  diameter: PropTypes.number,
  strokeWidth: PropTypes.number,
  stroke: PropTypes.string,
  fill: PropTypes.string,
};

export default Circle;
