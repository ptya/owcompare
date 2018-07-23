import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import heroes from '../data/heroes';

import Search from './Search';
import Selection from './Selection';
import Recommend from './Recommend';

import { getRandomPoints } from '../utils/helper';

const StyledBackground = styled.div`
  background-image: url(images/background2x.png);
  background-size: cover;
  background-color: rgb(44, 36, 89, 0.75);
  height: 100vh;
`;

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
    this.setState({ err: true }, () => {
      const self = this;
      if (window.err) clearTimeout(window.err);
      window.err = setTimeout(() => self.setState({ err: false }), 500);
    });
  };

  updateSearch = e => {
    const nextSearch = e.target.value;
    const { availableHeroes } = this.state;
    if (nextSearch === '') {
      this.setState({ search: nextSearch, err: false });
    } else {
      const filteredHeroes = Object.keys(availableHeroes).filter(hero => {
        const current = availableHeroes[hero];
        return (
          current.name.toLowerCase().indexOf(nextSearch.toLowerCase()) !== -1 ||
          current.id.toLowerCase().indexOf(nextSearch.toLowerCase()) !== -1
        );
      });
      filteredHeroes.length > 0
        ? this.setState({ search: nextSearch, err: false })
        : this.erroneous();
    }
  };

  updateSelected = key => {
    const { availableHeroes, selectedHeroes, slots } = this.state;
    if (Object.keys(selectedHeroes).length < slots) {
      // add selected hero to state
      const hero = availableHeroes[key];
      const newSelectedHeroes = { ...selectedHeroes, [key]: hero };
      this.setState({ selectedHeroes: newSelectedHeroes });

      // remove selected hero from availableHeroes
      const nextAvailableHeroes = { ...availableHeroes };
      delete nextAvailableHeroes[key];
      this.setState({ availableHeroes: nextAvailableHeroes });

      // reset search bar
      this.setState({ search: '' });
    }
  };

  removeSelected = key => {
    const { selectedHeroes, availableHeroes } = this.state;
    const hero = selectedHeroes[key];

    const newSelectedHeroes = { ...selectedHeroes };
    delete newSelectedHeroes[key];
    this.setState({ selectedHeroes: newSelectedHeroes });

    const newAvailableHeroes = { ...availableHeroes, [key]: hero };
    this.setState({ availableHeroes: newAvailableHeroes });
  };

  render() {
    const { allHeroes, availableHeroes, err, points, search, selectedHeroes, slots } = this.state;
    const { updateSearch, updateSelected, removeSelected } = this;
    const { children } = this.props;

    return (
      <StyledBackground>
        {children(
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
      </StyledBackground>
    );
  }
}

Compare.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Compare;
