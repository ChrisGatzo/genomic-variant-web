import * as R from 'ramda';

export const getSearchState = R.prop('search');
export const getGenes = R.pipe(getSearchState, R.prop('data'));
export const getSuggestedGenes = R.pipe(
  getSearchState,
  R.prop('suggestedGenes'),
);
export const getSearchInProgress = R.pipe(getSearchState, R.prop('isFetching'));
export const getIsAutoCompleteLoading = R.pipe(
  getSearchState,
  R.prop('isAutoCompleteFetching'),
);
