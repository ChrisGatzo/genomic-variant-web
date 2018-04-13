import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  autoComplete as autoCompleteActionCreator,
  autoCompleteClear as autoCompleteClearActionCreator,
  searchGenes as searchGenesActionCreator,
} from './actions/search';
import { getGenes, getSuggestedGenes } from './selectors/search';
import { GeneList, Search } from './components';

class GeneSearch extends Component {
  state = {
    searchTerm: '',
  };

  onChange = e => {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
    const { autoComplete, autoCompleteClear } = this.props;
    autoCompleteClear();
    autoComplete(searchTerm);
  };

  handleSearchClick = () => {
    const { searchGenes } = this.props;
    const { searchTerm } = this.state;
    searchGenes(searchTerm);
  };

  render() {
    const { searchTerm } = this.state;
    const { genes, suggestedGenes } = this.props;

    return (
      <div>
        <Search
          onChange={this.onChange}
          onClick={this.handleSearchClick}
          suggestedGenes={suggestedGenes}
          value={searchTerm}
        />
        {genes && <GeneList genes={genes} />}
      </div>
    );
  }
}

export default connect(
  state => ({
    genes: getGenes(state),
    suggestedGenes: getSuggestedGenes(state),
  }),
  dispatch => ({
    autoComplete: searchTerm => dispatch(autoCompleteActionCreator(searchTerm)),
    autoCompleteClear: () => dispatch(autoCompleteClearActionCreator()),
    searchGenes: searchTerm => dispatch(searchGenesActionCreator(searchTerm)),
  }),
)(GeneSearch);
