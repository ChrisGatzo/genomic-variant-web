import React from 'react';
import PropTypes from 'prop-types';
import styles from './search.css';

export default function Search({
  onChange,
  onClick,
  placeholder,
  searchTerm,
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
        {suggestedGenes && (
          <ul className={styles.suggestionBox}>
            {suggestedGenes.map(g => (
              <li className={styles.suggestedGene}>{g}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

Search.propTypes = {
  placeholder: PropTypes.string,
};

Search.defaultProps = {
  placeholder: 'Search for genes',
};
