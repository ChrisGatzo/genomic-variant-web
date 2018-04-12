import { SEARCH_FETCH, SEARCH_SUCCESS } from '../actions/search';

const genomes = [
  {
    gene: 'CYFIP1',
    source: 'ClinVar',
  },
  {
    gene: 'DDX52',
    source: 'ClinVar',
  },
];

const initialState = {
  data: null,
  isFetching: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FETCH: {
      return Object.assign({}, state, { isFetching: true });
    }
    case SEARCH_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        data: genomes.slice(),
      });
    }
    default: {
      return state;
    }
  }
}