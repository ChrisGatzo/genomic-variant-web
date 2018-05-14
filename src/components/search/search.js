import React from 'react';
import PropTypes from 'prop-types';
import styles from './search.css';
import Autocomplete from '../autocomplete/autocomplete';

export default function Search({
  isAutoCompleteLoading,
  onChange,
  onClick,
  onSuggestionClick,
  placeholder,
  suggestedGenes,
}) {
  return (
    <div className={styles.search}>
      <div className={styles.searchWrapper}>
        <Autocomplete
          isLoading={isAutoCompleteLoading}
          onClick={onClick}
          onChange={onChange}
          onItemClick={onSuggestionClick}
          placeholder={placeholder}
          suggestedItems={suggestedGenes}
          theme={{
            button: styles.searchButton,
            input: styles.input,
            suggestedList: styles.suggestedList,
            suggestedItem: styles.suggestedItem,
          }}
        />
      </div>
    </div>
  );
}

Search.propTypes = {
  isAutoCompleteLoading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  suggestedGenes: PropTypes.arrayOf(PropTypes.string),
};

Search.defaultProps = {
  placeholder: 'Search for genes',
  suggestedGenes: null,
};
