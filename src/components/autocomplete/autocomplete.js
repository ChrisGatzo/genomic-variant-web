import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Autocomplete extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    onButtonClick: PropTypes.func,
    onChange: PropTypes.func,
    onItemClick: PropTypes.func,
    placeholder: PropTypes.string,
    setRef: PropTypes.func,
    suggestedItems: PropTypes.array,
    theme: PropTypes.shape({
      button: PropTypes.string,
      input: PropTypes.string,
      suggestedList: PropTypes.string,
      suggestedItem: PropTypes.string,
    }),
    value: PropTypes.string,
  };

  static defaultProps = {
    isLoading: false,
    onButtonClick: () => {},
    onChange: () => {},
    onItemClick: () => {},
    placeholder: null,
    setRef: () => {},
    suggestedItems: null,
    theme: null,
    value: null,
  };

  state = {
    isCollapsed: true,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.ref && !this.ref.contains(event.target)) {
      this.setState({ isCollapsed: true });
    }
  };

  onItemClick = event => {
    const { onItemClick } = this.props;
    this.setState({ isCollapsed: true });
    onItemClick(event);
  };

  onValueChange = event => {
    const { onChange } = this.props;
    this.setState({ isCollapsed: false });
    onChange(event);
  };

  setRef = input => {
    this.ref = input;
  };

  render() {
    const {
      isLoading,
      onButtonClick,
      placeholder,
      suggestedItems,
      theme: { button, input, suggestedList, suggestedItem },
      value,
    } = this.props;
    const { isCollapsed } = this.state;

    return (
      <Fragment>
        <input
          className={input}
          onChange={this.onValueChange}
          placeholder={placeholder}
          value={value}
        />
        <button className={button} onClick={onButtonClick} />
        {!isCollapsed &&
          suggestedItems &&
          suggestedItems.length > 0 && (
            <ul ref={this.setRef} className={suggestedList}>
              {suggestedItems.map((g, i) => (
                <li
                  key={i}
                  className={suggestedItem}
                  onClick={this.onItemClick}
                >
                  {g}
                </li>
              ))}
            </ul>
          )}
        {isLoading && (
          <ul className={suggestedList}>
            <li className={suggestedItem}>autocomplete in progress...</li>
          </ul>
        )}
      </Fragment>
    );
  }
}
