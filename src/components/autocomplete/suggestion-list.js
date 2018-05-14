import { branch, compose, renderComponent, renderNothing } from 'recompose';
import ItemList from './item-list';
import Loading from './loading';

const hideIfNoData = hasNoData => branch(hasNoData, renderNothing);
const messageIfLoading = isLoading =>
  branch(isLoading, renderComponent(Loading));

const enhance = compose(
  messageIfLoading(({ isLoading }) => isLoading),
  hideIfNoData(
    ({ isCollapsed, suggestedItems }) =>
      !(!isCollapsed && suggestedItems && suggestedItems.length > 0),
  ),
);

export default enhance(ItemList);
