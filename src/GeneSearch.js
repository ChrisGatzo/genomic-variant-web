import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchGenes as searchGenesActionCreator } from './actions/search';
import { getGenes } from './selectors/search';
import { Search } from './components';

class GeneSearch extends Component {
  state = {
    searchTerm: '',
  };

  onChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearchClick = () => {
    const { searchGenes } = this.props;
    const { searchTerm } = this.state;
    searchGenes(searchTerm);
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

export default connect(
  state => ({
    genes: getGenes(state),
  }),
  dispatch => ({
    searchGenes: searchTerm => dispatch(searchGenesActionCreator(searchTerm)),
  }),
)(GeneSearch);
