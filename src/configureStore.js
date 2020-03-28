import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { rootEpic } from './epics';
import reducer from './reducers/root-reducer';

export function configureStore(deps = {}) {
  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {
      ajax,
      ...deps,
    },
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    reducer,
    composeEnhancers(applyMiddleware(epicMiddleware)),
  );
}
