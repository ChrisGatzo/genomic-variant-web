import React from 'react';
import PropTypes from 'prop-types';

export default function Search({ onChange, onClick, placeholder, searchTerm }) {
  return (
    <div>
      <input onChange={onChange} placeholder={placeholder} value={searchTerm} />
      <button onClick={onClick}>Search</button>
    </div>
  );
}

Search.propTypes = {
  placeholder: PropTypes.string,
};

Search.defaultProps = {
  placeholder: 'Search for genes',
};
