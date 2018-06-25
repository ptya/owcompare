import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import heroes from '../data/heroes';

import Search from './Search';
import Selection from './Selection';
import Recommend from './Recommend';

import { getRandomPoints } from '../utils/helper';

class Compare extends Component {
  static Search = Search;
  static Selection = Selection;
  static Recommend = Recommend;

  state = {
    allHeroes: heroes,
    err: false,
    availableHeroes: heroes,
    search: '',
    selectedHeroes: {},
    slots: 6,
    points: getRandomPoints(),
  };

  erroneous = () => {
    this.setState({ err: true}, () => {
      const self = this;
      if (window.err) clearTimeout(window.err);
      window.err = setTimeout(() => self.setState({ err: false }), 500);
    });
  }

  updateSearch = e => {
    const nextSearch = e.target.value;
    if (nextSearch === '') {
      this.setState({ search: nextSearch, err: false });
    } else {
      const filteredHeroes = Object.keys(this.state.availableHeroes).filter(hero => {
        const current = this.state.availableHeroes[hero];
        return (
          current.name.toLowerCase().indexOf(nextSearch.toLowerCase()) !== -1 ||
          current.id.toLowerCase().indexOf(nextSearch.toLowerCase()) !== -1
        );
      });
      (filteredHeroes.length > 0) ? this.setState({ search: nextSearch, err: false }) : this.erroneous();
    }
  };

  updateSelected = key => {
    const selectedHeroes = { ...this.state.selectedHeroes };
    if (Object.keys(selectedHeroes).length < this.state.slots) {
      // add selected hero to state
      const availableHeroes = { ...this.state.availableHeroes };
      const hero = availableHeroes[key];
      selectedHeroes[key] = { ...hero };
      this.setState({ selectedHeroes });

      // remove selected hero from availableHeroes
      delete availableHeroes[key];
      this.setState({ availableHeroes });

      // reset search bar
      this.setState({ search: '' });
    }
  };

  removeSelected = key => {
    const selectedHeroes = { ...this.state.selectedHeroes };
    const availableHeroes = { ...this.state.availableHeroes };
    const hero = selectedHeroes[key];
    delete selectedHeroes[key];
    this.setState({ selectedHeroes });

    availableHeroes[key] = { ...hero };
    this.setState({ availableHeroes });
  };

  render() {
    const { allHeroes, availableHeroes, err, points, search, selectedHeroes, slots } = this.state;
    const { updateSearch, updateSelected, removeSelected } = this;

    return (
      <Fragment>
        {this.props.children(
          allHeroes,
          err,
          availableHeroes,
          points,
          search,
          selectedHeroes,
          slots,
          updateSearch,
          updateSelected,
          removeSelected
        )}
      </Fragment>
    );
  }
}

Compare.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Compare;
