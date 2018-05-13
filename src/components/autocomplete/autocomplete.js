import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, withHandlers, withState } from 'recompose';

const isCollapsible = compose(
  withState('isCollapsed', 'setIsCollapsed', true),
  withHandlers(() => {
    let element = null;
    return {
      onRef: () => ref => {
        element = ref;
      },
      handleClickOutside: props => event => {
        if (element && !element.contains(event.target)) {
          props.setIsCollapsed(true);
        }
      },
    };
  }),
  lifecycle({
    componentDidMount() {
      document.addEventListener('mousedown', this.props.handleClickOutside);
    },
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.props.handleClickOutside);
    },
  }),
);

const enhance = compose(
  isCollapsible,
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
  isCollapsed,
  isLoading,
  onButtonClick,
  onItemClick,
  onRef,
  onValueChange,
  placeholder,
  suggestedItems,
  theme: { button, input, suggestedList, suggestedItem },
  value,
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
      {!isCollapsed &&
        suggestedItems &&
        suggestedItems.length > 0 && (
          <ul ref={onRef} className={suggestedList}>
            {suggestedItems.map((g, i) => (
              <li key={i} className={suggestedItem} onClick={onItemClick}>
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
