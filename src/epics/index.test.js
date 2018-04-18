import { Observable } from 'rxjs';
import { ActionsObservable } from 'redux-observable';
import { AUTO_COMPLETE_FETCH, SEARCH_FETCH } from '../actions/search';
import { loadAutoCompleteEpic, loadGenesEpic } from './index';

describe('index epics', () => {
  describe('loadAutoCompleteEpic', () => {
    let deps = {};
    beforeEach(() => {
      deps = {
        ajax: {
          getJSON: () => Observable.of(['gene1', 'gene2']),
        },
      };
    });

    it('returns a array of strings when given searchTerm with length greater than 1', done => {
      const action$ = ActionsObservable.of({
        type: AUTO_COMPLETE_FETCH,
        payload: 'test',
      });
      const expectedOutputActions = [
        { payload: true, type: 'AUTO_COMPLETE_LOADING' },
        { payload: ['gene1', 'gene2'], type: 'AUTO_COMPLETE_SUCCESS' },
      ];

      loadAutoCompleteEpic(action$, null, deps)
        .toArray()
        .subscribe(actualOutputActions => {
          expect(actualOutputActions).toEqual(expectedOutputActions);
          done();
        });
    });

    it('returns an empty array when given searchTerm with length less or equal to 1', done => {
      const action$ = ActionsObservable.of({
        type: AUTO_COMPLETE_FETCH,
        payload: 't',
      });
      const expectedOutputActions = [];

      loadAutoCompleteEpic(action$, null, deps)
        .toArray()
        .subscribe(actualOutputActions => {
          expect(actualOutputActions).toEqual(expectedOutputActions);
          done();
        });
    });
  });

  describe('loadGenesEpic', () => {
    it('returns an array of genes when given a non empty searchTerm', done => {
      const deps = {
        ajax: {
          getJSON: () => Observable.of([{ gene: 'gene1' }, { gene: 'gene2' }]),
        },
      };
      const action$ = ActionsObservable.of({
        type: SEARCH_FETCH,
        payload: 'test',
      });
      const expectedOutputActions = [
        {
          payload: [{ gene: 'gene1' }, { gene: 'gene2' }],
          type: 'SEARCH_SUCCESS',
        },
      ];

      loadGenesEpic(action$, null, deps)
        .toArray()
        .subscribe(actualOutputActions => {
          expect(actualOutputActions).toEqual(expectedOutputActions);
          done();
        });
    });
  });
});
