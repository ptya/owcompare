import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Scrollbars } from 'react-custom-scrollbars';

class CustomScrollbar extends Component {
  render() {
    const { listLength, toHide } = this.props;
    const style = {
      display: toHide ? 'none' : 'block',
      width: '335px',
      height: listLength < 8 ? `${listLength * 30}px` : '240px',
      margin: 'auto',
      borderBottom: '1px solid #ff81002b',
    };
    return (
      <Scrollbars style={style} ref={this.props.reference} universal>
        {this.props.children}
      </Scrollbars>
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
