import React from 'react';
import PropTypes from 'prop-types';

export default function Search({ placeholder }) {
  return <input placeholder={placeholder} />;
}

Search.propTypes = {
  placeholder: PropTypes.string,
};

Search.defaultProps = {
  placeholder: 'Search for genes',
};
