import { of, concat } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { ofType } from 'redux-observable';
import { filter, mergeMap, takeUntil, map } from 'rxjs/operators';
import {
  AUTO_COMPLETE_FETCH,
  autoCompleteLoading,
  autoCompleteSuccess,
  SEARCH_FETCH,
  searchGenesSuccess,
} from '../actions/search';

const api = process.env.REACT_API_SERVER || 'localhost:3000';

export function loadAutoCompleteEpic(action$, store, deps) {
  return action$.pipe(
    ofType(AUTO_COMPLETE_FETCH),
    filter(action => action.payload && action.payload.length > 1),
    mergeMap(({ payload }) => {
      const loading = of(autoCompleteLoading(true));

      const request = deps.ajax
        .getJSON(`${api}/genes/autocomplete?searchTerm=${payload}`)
        .pipe(
          takeUntil(action$.ofType(SEARCH_FETCH)),
          map(response => autoCompleteSuccess(response)),
        );

      return concat(loading, request);
    }),
  );
}

export function loadGenesEpic(action$, store, deps) {
  return action$.pipe(
    ofType(SEARCH_FETCH),
    filter(action => action.payload !== ''),
    mergeMap(({ payload }) => {
      console.log(payload);
      console.log(
        deps.ajax.getJSON(`${api}/genes/search?searchTerm=${payload}`),
      );
      return deps.ajax
        .getJSON(`${api}/genes/search?searchTerm=${payload}`)
        .map(response => searchGenesSuccess(response));
    }),
  );
}

export const rootEpic = combineEpics(loadAutoCompleteEpic, loadGenesEpic);
