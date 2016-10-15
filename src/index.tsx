import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./App";

const rootElement = document.getElementById("main");
ReactDOM.render(<AppContainer><App /></AppContainer>, rootElement);

if ((module as any).hot) {
    (module as any).hot.accept("./App", () => {
        const NextApp = require("./App").default;
        ReactDOM.render(<AppContainer><NextApp /></AppContainer>, rootElement);
        
    });
}
