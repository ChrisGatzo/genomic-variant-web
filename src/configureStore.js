import 'rxjs';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { rootEpic } from './epics';
import reducer from './reducers/root-reducer';


export function configureStore(deps = {}) {
  const epicMiddleware = createEpicMiddleware({ dependencies: {
    ajax
  } });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(epicMiddleware)),
  );

  epicMiddleware.run(rootEpic);

  return store
}
