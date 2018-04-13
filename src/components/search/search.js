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
      <input className={styles.input} onChange={onChange} placeholder={placeholder} value={searchTerm} />
      <button className={styles.searchButton} onClick={onClick}/>
      <div>{suggestedGenes && suggestedGenes.map(g => <p>{g}</p>)}</div>
    </div>
  );
}

Search.propTypes = {
  placeholder: PropTypes.string,
};

Search.defaultProps = {
  placeholder: 'Search for genes',
};
