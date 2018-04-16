import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';
import {
  AUTO_COMPLETE_FETCH,
  autoCompleteLoading,
  autoCompleteSuccess,
  SEARCH_FETCH,
  searchGenesSuccess,
} from '../actions/search';

const api = 'http://localhost:5000/api';

function loadAutoCompleteEpic(action$) {
  return action$
    .ofType(AUTO_COMPLETE_FETCH)
    .filter(action => action.payload && action.payload.length > 1)
    .mergeMap(({ payload }) => {
      const loading = Observable.of(autoCompleteLoading(true));

      const request = ajax
        .getJSON(`${api}/genes/autocomplete?searchTerm=${payload}`)
        .takeUntil(action$.ofType(SEARCH_FETCH))
        .map(response => autoCompleteSuccess(response));

      return Observable.concat(loading, request);
    });
}

function loadGenesEpic(action$) {
  return action$
    .ofType(SEARCH_FETCH)
    .filter(action => action.payload !== '')
    .mergeMap(({ payload }) =>
      ajax
        .getJSON(`${api}/genes/search?searchTerm=${payload}`)
        .map(response => searchGenesSuccess(response)),
    );
}

export const rootEpic = combineEpics(loadAutoCompleteEpic, loadGenesEpic);
