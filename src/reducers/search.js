import { SEARCH_FETCH, SEARCH_SUCCESS } from '../actions/search';

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
        data: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}