import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose, pure, withStateHandlers } from 'recompose';
import styles from './expanding-column.css';
import expandingColumns from './expand-collapse.png';

const enhance = compose(
  pure,
  withStateHandlers(
    ({ initialValue = true }) => ({
      isHidden: initialValue,
    }),
    {
      toggleVisibility: ({ isHidden }) => () => ({
        isHidden: !isHidden,
      }),
    },
  ),
);

function ExpandingColumn({ isHidden, toggleVisibility, values }) {
  return (
    <span
      className={classNames(styles.toggleExpander, {
        [styles.visible]: !isHidden,
      })}
    >
      {values &&
        values.split(',').map((n, j) => (
          <p key={j} className={styles.otherMappings}>
            {j === 0 && (
              <span className={styles.arrowWrapper} onClick={toggleVisibility}>
                <img
                  className={classNames(styles.arrow, {
                    [styles.open]: !isHidden,
                  })}
                  src={expandingColumns}
                  alt="expand arrow"
                />
              </span>
            )}
            {n}
          </p>
        ))}
    </span>
  );
}

ExpandingColumn.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  values: PropTypes.string,
};

ExpandingColumn.defaultProps = {
  values: null,
};

export default enhance(ExpandingColumn);
