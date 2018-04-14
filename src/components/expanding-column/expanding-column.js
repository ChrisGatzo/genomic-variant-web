import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './expanding-column.css';
import expandingColumns from './expand-collapse.png';

export default class ExpandingColumn extends Component {
  static propTypes = {
    values: PropTypes.string,
  };

  static defaultProps = {
    values: null,
  };

  state = {
    isHidden: true,
  };

  toggleExpander = () => {
    const { isHidden } = this.state;
    this.setState({ isHidden: !isHidden });
  };

  render() {
    const { values } = this.props;
    return (
      <span
        className={classNames(styles.toggleExpander, {
          [styles.visible]: !this.state.isHidden,
        })}
      >
        {values &&
          values.split(',').map((n, j) => (
            <p key={j} className={styles.otherMappings}>
              {j === 0 && (
                <span
                  className={styles.arrowWrapper}
                  onClick={this.toggleExpander}
                >
                  <img
                    className={classNames(styles.arrow, {
                      [styles.open]: !this.state.isHidden,
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
}
