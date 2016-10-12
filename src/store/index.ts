import sagas from "../sagas";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "reducers";

export function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducer, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(sagas);

    return store;
}
