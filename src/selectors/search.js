import * as R from "ramda";

export const getSearchState = R.prop('search');
export const getGenes = R.pipe(getSearchState, R.prop('data'));