import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import {
  AUTO_COMPLETE_FETCH,
  autoCompleteLoading,
  autoCompleteSuccess,
  SEARCH_FETCH,
  searchGenesSuccess,
} from '../actions/search';

const api = 'http://localhost:5000/api';

export function loadAutoCompleteEpic(action$, store, deps) {
  return action$
    .ofType(AUTO_COMPLETE_FETCH)
    .filter(action => action.payload && action.payload.length > 1)
    .mergeMap(({ payload }) => {
      const loading = Observable.of(autoCompleteLoading(true));

      const request = deps.ajax
        .getJSON(`${api}/genes/autocomplete?searchTerm=${payload}`)
        .takeUntil(action$.ofType(SEARCH_FETCH))
        .map(response => autoCompleteSuccess(response));

      return Observable.concat(loading, request);
    });
}

export function loadGenesEpic(action$, store, deps) {
  return action$
    .ofType(SEARCH_FETCH)
    .filter(action => action.payload !== '')
    .mergeMap(({ payload }) =>
      deps.ajax
        .getJSON(`${api}/genes/search?searchTerm=${payload}`)
        .map(response => searchGenesSuccess(response)),
    );
}

export const rootEpic = combineEpics(loadAutoCompleteEpic, loadGenesEpic);
