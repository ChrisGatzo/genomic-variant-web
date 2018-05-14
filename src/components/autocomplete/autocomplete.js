import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withState } from 'recompose';
import { withClickOutside } from '../../enhancers/withClickOutside';
import SuggestionList from './suggestion-list';

const enhance = compose(
  withClickOutside,
  withState('value', 'setValue', null),
  withHandlers(() => ({
    onClick: ({ onClick, value }) => () => {
      onClick(value);
    },
    onItemClick: ({ onItemClick, setIsCollapsed }) => e => {
      setIsCollapsed(true);
      onItemClick(e.target.innerText);
    },
    onChange: ({ onChange, setIsCollapsed, setValue }) => e => {
      setIsCollapsed(false);
      setValue(e.target.value);
      onChange(e.target.value);
    },
  })),
);

function Autocomplete({
  onChange,
  onClick,
  placeholder,
  theme: { button, input, ...otherThemeProps },
  ...otherProps
}) {
  return (
    <Fragment>
      <input className={input} onChange={onChange} placeholder={placeholder} />
      <button className={button} onClick={onClick} />
      <SuggestionList {...otherProps} theme={{ ...otherThemeProps }} />
    </Fragment>
  );
}

Autocomplete.propTypes = {
  isCollapsed: PropTypes.bool,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onItemClick: PropTypes.func,
  onRef: PropTypes.func,
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
};

Autocomplete.defaultProps = {
  isCollapsed: true,
  isLoading: false,
  onChange: () => {},
  onClick: () => {},
  onItemClick: () => {},
  onRef: () => {},
  placeholder: null,
  setIsCollapsed: () => {},
  setRef: () => {},
  suggestedItems: null,
  theme: null,
};

export default enhance(Autocomplete);
