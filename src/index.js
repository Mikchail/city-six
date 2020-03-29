import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {Operation} from './reducer/cities-reduser.js';
import {createApi} from './api/api';
import {ActionCreator} from './actions/action-creator';
import reducer from './reducer/index.js';
import App from './componetns/app/app.jsx';
import {composeWithDevTools} from 'redux-devtools-extension';

const api = createApi();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

export const onError = (err) => {
  store.dispatch(ActionCreator.getError(err));
  store.dispatch(Operation.changeState());
};
store.dispatch(Operation.download());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById(`root`)
);
