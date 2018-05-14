import React from 'react';
import PropTypes from 'prop-types';

const ItemList = ({
  suggestedItems,
  onItemClick,
  onRef,
  theme: { suggestedList, suggestedItem },
}) => (
  <ul ref={onRef} className={suggestedList}>
    {suggestedItems.map((g, i) => (
      <li key={i} className={suggestedItem} onClick={onItemClick}>
        {g}
      </li>
    ))}
  </ul>
);

ItemList.propTypes = {
  onItemClick: PropTypes.func,
  onRef: PropTypes.func,
  suggestedItems: PropTypes.array,
  theme: PropTypes.shape({
    suggestedList: PropTypes.string,
    suggestedItem: PropTypes.string,
  }),
};

ItemList.defaultProps = {
  onItemClick: () => {},
  onRef: () => {},
  suggestedItems: null,
  theme: null,
};

export default ItemList;
