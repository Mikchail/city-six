import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {Operation} from './reducer/cities-reducer.js';
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
  store.dispatch(Operation.changeState());
};

const render = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
store.dispatch(Operation.download());
ReactDOM.render(render(), document.getElementById(`root`));
