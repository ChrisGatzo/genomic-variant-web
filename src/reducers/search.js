import {
  AUTO_COMPLETE_CLEAR,
  AUTO_COMPLETE_SUCCESS,
  SEARCH_FETCH,
  SEARCH_SUCCESS
} from '../actions/search';

const initialState = {
  data: null,
  suggestedGenes: null,
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
    case AUTO_COMPLETE_SUCCESS: {
      return Object.assign({}, state, {
        suggestedGenes: action.payload,
      });
    }
    case AUTO_COMPLETE_CLEAR: {
      return Object.assign({}, state, {
        suggestedGenes: null,
      });
    }
    default: {
      return state;
    }
  }
}