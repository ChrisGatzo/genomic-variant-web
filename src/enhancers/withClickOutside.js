import { compose, lifecycle, withHandlers, withState } from 'recompose';

export const withClickOutside = compose(
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
