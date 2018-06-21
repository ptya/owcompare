import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import Scrollbar from 'react-smooth-scrollbar';
import styled from 'styled-components';

import { SEARCH_WIDTH, SEARCH_ITEM_HEIGHT } from '../utils/style-utils';

SmoothScrollbar.use(OverscrollPlugin);

const StyledScrollbar = styled(Scrollbar)`
  display: ${props => (props.hidden ? 'none !important' : 'block')};
  width: ${SEARCH_WIDTH - 15}px;
  height: ${props =>
    props.len < 8 ? `${props.len * SEARCH_ITEM_HEIGHT}px` : `${SEARCH_ITEM_HEIGHT * 8}px`};
  margin: auto;
  border-bottom: 1px solid #ff81002b;
`;

class CustomScrollbar extends Component {
  render() {
    const { listLength, toHide } = this.props;
    return (
      <StyledScrollbar
        innerRef={this.props.reference}
        hidden={toHide}
        len={listLength}
        alwaysShowTracks
        plugins={{
          overscroll: {
            effect: 'glow',
          },
        }}
      >
        {this.props.children}
      </StyledScrollbar>
    );
  }
}

CustomScrollbar.propTypes = {
  children: PropTypes.any.isRequired,
  listLength: PropTypes.number.isRequired,
  reference: PropTypes.object.isRequired,
  toHide: PropTypes.bool.isRequired,
};

export default CustomScrollbar;
