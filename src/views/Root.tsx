import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import Index from '../views';

const Root: React.StatelessComponent<any> = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/(:turn)" component={Index} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

Root.contextTypes = {
    router: React.PropTypes.object
};

export default Root;
