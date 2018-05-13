import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { withClickOutside } from '../../enhancers/withClickOutside';
import SuggestionList from './suggestion-list';

const enhance = compose(
  withClickOutside,
  withHandlers(() => ({
    onItemClick: ({ onItemClick, setIsCollapsed }) => event => {
      setIsCollapsed(true);
      onItemClick(event);
    },
    onValueChange: ({ onChange, setIsCollapsed }) => event => {
      setIsCollapsed(false);
      onChange(event);
    },
  })),
);

function Autocomplete({
  onValueChange,
  placeholder,
  value,
  theme: { button, input, ...otherThemeProps },
  onButtonClick,
  ...otherProps
}) {
  return (
    <Fragment>
      <input
        className={input}
        onChange={onValueChange}
        placeholder={placeholder}
        value={value}
      />
      <button className={button} onClick={onButtonClick} />
      <SuggestionList {...otherProps} theme={{ ...otherThemeProps }} />
    </Fragment>
  );
}

Autocomplete.propTypes = {
  isCollapsed: PropTypes.bool,
  isLoading: PropTypes.bool,
  onButtonClick: PropTypes.func,
  onChange: PropTypes.func,
  onItemClick: PropTypes.func,
  onRef: PropTypes.func,
  onValueChange: PropTypes.func,
  placeholder: PropTypes.string,
  setIsCollapsed: PropTypes.func,
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

Autocomplete.defaultProps = {
  isCollapsed: true,
  isLoading: false,
  onButtonClick: () => {},
  onChange: () => {},
  onItemClick: () => {},
  onRef: () => {},
  onValueChange: () => {},
  placeholder: null,
  setIsCollapsed: () => {},
  setRef: () => {},
  suggestedItems: null,
  theme: null,
  value: null,
};

export default enhance(Autocomplete);
