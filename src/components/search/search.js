import React from 'react';
import PropTypes from 'prop-types';
import styles from './search.css';

export default function Search({
  isSuggestionBoxActive,
  onChange,
  onClick,
  onSuggestionClick,
  placeholder,
  searchTerm,
  setRef,
  suggestedGenes,
}) {
  return (
    <div className={styles.search}>
      <div className={styles.searchWrapper}>
        <input
          className={styles.input}
          onChange={onChange}
          placeholder={placeholder}
          value={searchTerm}
        />
        <button className={styles.searchButton} onClick={onClick} />
        {suggestedGenes &&
          isSuggestionBoxActive && (
            <ul ref={setRef} className={styles.suggestionBox}>
              {suggestedGenes.map((g, i) => (
                <li
                  key={i}
                  className={styles.suggestedGene}
                  onClick={onSuggestionClick}
                >
                  {g}
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
}

Search.propTypes = {
  isSuggestionBoxActive: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  searchTerm: PropTypes.string,
  setRef: PropTypes.func.isRequired,
  suggestedGenes: PropTypes.arrayOf(PropTypes.string),
};

Search.defaultProps = {
  placeholder: 'Search for genes',
  searchTerm: undefined,
  suggestedGenes: null,
};
