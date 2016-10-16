import * as React from "react";
import { Provider } from "react-redux";

import { configureStore } from "./store";
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { throttle } from 'lodash'

import Index from "views";
import Root from "views/Root";

import {loadState, saveState} from  'localStorage';

const persistedState = loadState();
const store = configureStore(persistedState);

// subscribe to chnages made to state and persist in local storage at max of once per second 
store.subscribe(throttle(()=>{
    saveState(store.getState());
}, 1000));

// Create an enhanced history that syncs navigation events with the store
export const history = syncHistoryWithStore(browserHistory, store);

/* tslint:disable */
require("ionicons-npm/css/ionicons.css");
/* tslint:enable */ 

export default function App() {
    return <Root store={store} history={history} />;
}