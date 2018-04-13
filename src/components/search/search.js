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
            {suggestedGenes.map((g, i) => (
              <li key={i} className={styles.suggestedGene}>
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
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  searchTerm: PropTypes.string,
  suggestedGenes: PropTypes.arrayOf(PropTypes.string),
};

Search.defaultProps = {
  placeholder: 'Search for genes',
  searchTerm: undefined,
  suggestedGenes: null,
};
