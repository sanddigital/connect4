import * as React from "react";
import { Provider } from "react-redux";

import {configureStore} from "./store";
import Index from "views";

const store = configureStore();

/* tslint:disable */
require("ionicons-npm/css/ionicons.css");
/* tslint:enable */

export default function App() {
    return <Provider store={store}>
        <Index />
    </Provider>;
}
