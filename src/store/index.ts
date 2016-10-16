import sagas from "../sagas";
import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { browserHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import { Store as ReduxStore } from "redux";

import reducers from 'reducers';

export let theStore : ReduxStore<any> = null;

export function configureStore(persistedState) {
    const middleware = routerMiddleware(browserHistory);
    const sagaMiddleware = createSagaMiddleware();
    theStore = createStore(reducers, persistedState, applyMiddleware(sagaMiddleware, middleware));
    sagaMiddleware.run(sagas);
    return theStore;
}

export const getStore = () =>{
    return theStore;
}