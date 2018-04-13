export const AUTO_COMPLETE_CLEAR = 'AUTO_COMPLETE_CLEAR';
export const AUTO_COMPLETE_FETCH = 'AUTO_COMPLETE_FETCH';
export const AUTO_COMPLETE_SUCCESS = 'AUTO_COMPLETE_SUCCESS';
export const SEARCH_FETCH = 'SEARCH_FETCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

export function autoComplete(searchTerm) {
  return {
    type: AUTO_COMPLETE_FETCH,
    payload: searchTerm,
  }
}

export function autoCompleteSuccess(suggestedGenes) {
  return {
    type: AUTO_COMPLETE_SUCCESS,
    payload: suggestedGenes,
  }
}

export function autoCompleteClear() {
  return {
    type: AUTO_COMPLETE_CLEAR,
  }
}

export function searchGenes(searchTerm) {
  return {
    type: SEARCH_FETCH,
    payload: searchTerm,
  };
}

export function searchGenesSuccess(genes) {
  return {
    type: SEARCH_SUCCESS,
    payload: genes,
  }
}
