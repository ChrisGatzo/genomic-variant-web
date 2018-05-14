import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect/es';
import {
  autoComplete as autoCompleteActionCreator,
  autoCompleteClear as autoCompleteClearActionCreator,
  searchGenes as searchGenesActionCreator,
} from './actions/search';
import {
  getGenes,
  getIsAutoCompleteLoading,
  getSearchInProgress,
  getSuggestedGenes,
} from './selectors/search';
import { GeneList, Search } from './components';
import styles from './geneSearch.css';

class GeneSearch extends Component {
  static propTypes = {
    autoComplete: PropTypes.func.isRequired,
    autoCompleteClear: PropTypes.func.isRequired,
    genes: PropTypes.array,
    isAutoCompleteLoading: PropTypes.bool.isRequired,
    isSearchInProgress: PropTypes.bool.isRequired,
    searchGenes: PropTypes.func.isRequired,
    suggestedGenes: PropTypes.array,
  };

  static defaultProps = {
    genes: null,
    suggestedGenes: null,
  };

  handleSearchClick = value => {
    const { searchGenes } = this.props;
    searchGenes(value);
  };

  onChange = value => {
    const { autoComplete, autoCompleteClear } = this.props;
    autoCompleteClear();
    autoComplete(value);
  };

  onSuggestionClick = value => {
    this.handleSearchClick(value);
  };

  render() {
    const {
      genes,
      isAutoCompleteLoading,
      isSearchInProgress,
      suggestedGenes,
    } = this.props;

    return (
      <div className={styles.geneSearch}>
        <Search
          onChange={this.onChange}
          onClick={this.handleSearchClick}
          onSuggestionClick={this.onSuggestionClick}
          isAutoCompleteLoading={isAutoCompleteLoading}
          suggestedGenes={suggestedGenes}
        />
        {isSearchInProgress && <p>search in progress...</p>}
        {!isSearchInProgress && genes && <GeneList genes={genes} />}
      </div>
    );
  }
}

export default connect(
  createStructuredSelector({
    genes: getGenes,
    isAutoCompleteLoading: getIsAutoCompleteLoading,
    isSearchInProgress: getSearchInProgress,
    suggestedGenes: getSuggestedGenes,
  }),
  {
    autoComplete: autoCompleteActionCreator,
    autoCompleteClear: autoCompleteClearActionCreator,
    searchGenes: searchGenesActionCreator,
  },
)(GeneSearch);
