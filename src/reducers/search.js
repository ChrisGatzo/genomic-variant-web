import {
  AUTO_COMPLETE_CLEAR,
  AUTO_COMPLETE_LOADING,
  AUTO_COMPLETE_SUCCESS,
  SEARCH_FETCH,
  SEARCH_SUCCESS,
} from '../actions/search';

const initialState = {
  data: null,
  isAutoCompleteFetching: false,
  isFetching: false,
  suggestedGenes: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FETCH: {
      return Object.assign({}, state, {
        isAutoCompleteFetching: false,
        isFetching: true,
      });
    }
    case SEARCH_SUCCESS: {
      return Object.assign({}, state, {
        data: action.payload,
        isAutoCompleteFetching: false,
        isFetching: false,
      });
    }
    case AUTO_COMPLETE_LOADING: {
      return Object.assign({}, state, {
        isAutoCompleteFetching: action.payload,
      });
    }
    case AUTO_COMPLETE_SUCCESS: {
      return Object.assign({}, state, {
        isAutoCompleteFetching: false,
        suggestedGenes: action.payload,
      });
    }
    case AUTO_COMPLETE_CLEAR: {
      return Object.assign({}, state, {
        isAutoCompleteFetching: false,
        suggestedGenes: null,
      });
    }
    default: {
      return state;
    }
  }
}
