import * as React from "react";
import { Provider } from "react-redux";

import { configureStore } from "./store";
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import Index from "views";
import Root from "views/Root";

export const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

/* tslint:disable */
require("ionicons-npm/css/ionicons.css");
/* tslint:enable */

export function getStore(){
    return store;
} 

export default function App() {
    return <Root store={store} history={history} />;
}