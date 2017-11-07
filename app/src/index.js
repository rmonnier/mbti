import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';

import rootReducer from './reducers';
import HyperRouter from './HyperRouter.js';
// import registerServiceWorker from './registerServiceWorker';

const token = localStorage.getItem('x-access-token');
if (token) {
  axios.defaults.headers.common['x-access-token'] = token;
}

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
  ),
);


ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <HyperRouter />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);
// registerServiceWorker();
