export const SEARCH_FETCH = 'SEARCH_FETCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

export function searchGenes(searchTerm) {
  return {
    type: SEARCH_FETCH,
    payload: searchTerm,
  };
}
