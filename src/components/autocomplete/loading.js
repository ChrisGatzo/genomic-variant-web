import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ theme: { suggestedList, suggestedItem } }) => (
  <ul className={suggestedList}>
    <li className={suggestedItem}>autocomplete in progress...</li>
  </ul>
);

Loading.propTypes = {
  theme: PropTypes.shape({
    suggestedList: PropTypes.string,
    suggestedItem: PropTypes.string,
  }),
};

Loading.defaultProps = {
  theme: null,
};

export default Loading;
