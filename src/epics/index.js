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

const api = 'https://private-3c0e94-jordangarcia.apiary-mock.com/api';

export function loadAutoCompleteEpic(action$, store, deps) {
  return action$.pipe(
    ofType(AUTO_COMPLETE_FETCH),
    filter(action => action.payload && action.payload.length > 1),
    mergeMap(({ payload }) => {
      const loading = of(autoCompleteLoading(true));

      const request = deps.ajax
        .getJSON(`${api}/genes/autocomplete?searchTerm=${payload}`).pipe(
        takeUntil(action$.ofType(SEARCH_FETCH)),
        map(response => autoCompleteSuccess(response)));

      return concat(loading, request);
    }));
}


export function loadGenesEpic(action$, store, deps) {
  return action$.pipe(
    ofType(SEARCH_FETCH),
    filter(action => action.payload !== ''),
    mergeMap(({ payload }) => {
      const request = deps.ajax
        .getJSON(`${api}/genes/search?searchTerm=${payload}`).pipe(
        map(response => searchGenesSuccess(response)));

      return request;
    }));
}

export const rootEpic = combineEpics(loadAutoCompleteEpic);
