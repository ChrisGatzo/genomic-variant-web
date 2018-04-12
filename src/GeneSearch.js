import React, { Component } from 'react';
import { Search } from './components';

export default class GeneSearch extends Component {
  state = {
    searchTerm: '',
  };

  onChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearchClick = () => {
    console.log('perform searcb');
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div>
        <Search
          onChange={this.onChange}
          onClick={this.handleSearchClick}
          value={searchTerm}
        />
      </div>
    );
  }
}
