import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { SEARCH_FETCH, searchGenesSuccess } from '../actions/search';

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

function loadStoriesEpic(action$) {
  return action$
    .ofType(SEARCH_FETCH)
    .filter(action => action.payload !== '')
    .mapTo(searchGenesSuccess(genomes));
}

export const rootEpic = combineEpics(loadStoriesEpic);
