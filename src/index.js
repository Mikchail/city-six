import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {Operations as UserOperations} from './reducer/user-reducer.js';
import {Operations as DataOperations} from './reducer/cities-reducer.js';
import {createApi} from './api/api';
import {ActionCreator} from './actions/action-creator';
import reducer from './reducer/rootReducer';
import App from './componetns/app/app.jsx';
import {composeWithDevTools} from 'redux-devtools-extension';

const api = createApi();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

export const onError = (err) => {
  store.dispatch(ActionCreator.getError(err));
  store.dispatch(UserOperations.logout());
};


store.dispatch(DataOperations.download());
store.dispatch(UserOperations.checkAuth());
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById(`root`));
