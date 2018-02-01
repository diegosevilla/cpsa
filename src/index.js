import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import thunk from 'redux-thunk';
import rootReducer from './reducers';


import * as Containers from './containers/index';

const middleware = applyMiddleware(thunk, createLogger());
export const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <main>
        <Route exact path="/" component={Containers.Home} />
        <Route exact path="/create-survey" component={Containers.CreateSurvey} />
        <Route exact path="/view-result" component={Containers.ViewResult} />
      </main>
    </Router>
  </Provider>,
  document.getElementById('root')
);
