export const AUTO_COMPLETE_CLEAR = 'AUTO_COMPLETE_CLEAR';
export const AUTO_COMPLETE_FETCH = 'AUTO_COMPLETE_FETCH';
export const AUTO_COMPLETE_LOADING = 'AUTO_COMPLETE_LOADING';
export const AUTO_COMPLETE_SUCCESS = 'AUTO_COMPLETE_SUCCESS';
export const SEARCH_FETCH = 'SEARCH_FETCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

export function autoComplete(searchTerm) {
  return {
    payload: searchTerm,
    type: AUTO_COMPLETE_FETCH,
  };
}

export function autoCompleteLoading(isLoading) {
  return {
    payload: isLoading,
    type: AUTO_COMPLETE_LOADING,
  };
}

export function autoCompleteSuccess(suggestedGenes) {
  return {
    payload: suggestedGenes,
    type: AUTO_COMPLETE_SUCCESS,
  };
}

export function autoCompleteClear() {
  return {
    type: AUTO_COMPLETE_CLEAR,
  };
}

export function searchGenes(searchTerm) {
  return {
    payload: searchTerm,
    type: SEARCH_FETCH,
  };
}

export function searchGenesSuccess(genes) {
  return {
    payload: genes,
    type: SEARCH_SUCCESS,
  };
}
