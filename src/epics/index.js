import { combineEpics } from 'redux-observable';
import {
  AUTO_COMPLETE_FETCH,
  autoCompleteSuccess,
  SEARCH_FETCH,
  searchGenesSuccess,
} from '../actions/search';
import { genes } from '../mocks/genes';

const suggestedGenes = [
  'ABAT',
  'ABCA1',
  'ABCA10',
  'ABCA12',
  'ABCA13',
  'ABCA2',
  'ABCA3',
  'ABCA4',
  'ABCA5',
  'ABCA7',
  'ABCA8',
  'ABCA9-AS1',
  'ABCB1',
  'ABCB11',
  'ABCB4',
  'ABCB5',
  'ABCB6',
  'ABCB7',
  'ABCC1',
  'ABCC11',
  'ABCC12',
  'ABCC2',
  'ABCC3',
  'ABCC4',
  'ABCC5',
  'ABCC6',
  'ABCC8',
  'ABCC9',
  'ABCD1',
  'ABCD2',
  'ABCD3',
  'ABCD4',
  'ABCE1',
  'ABCF1',
  'ABCF3',
  'ABCG1',
  'ABCG2',
  'ABCG4',
  'ABCG5',
  'ABCG8',
];

function loadAutoCompleteEpic(action$) {
  return action$
    .ofType(AUTO_COMPLETE_FETCH)
    .filter(action => action.payload && action.payload.length > 1)
    .map(
      ({ payload }) =>
        // TODO remove this when backend is done
        payload === 'ABB'
          ? autoCompleteSuccess([])
          : autoCompleteSuccess(suggestedGenes),
    );
}

function loadGenesEpic(action$) {
  return action$
    .ofType(SEARCH_FETCH)
    .filter(action => action.payload !== '')
    .mapTo(searchGenesSuccess(genes));
}

export const rootEpic = combineEpics(loadAutoCompleteEpic, loadGenesEpic);
