import sagas from "../sagas";
import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { browserHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';

import reducers from 'reducers';

export function configureStore() {
    const middleware = routerMiddleware(browserHistory);
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducers, applyMiddleware(sagaMiddleware, middleware));
    sagaMiddleware.run(sagas);
    return store;
}