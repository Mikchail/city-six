import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

export default history;
export const redirect = (_store) => (next) => (action) => {

  if (action.type === `REDIRECT_TO_ROUTE`) {
    history.push(action.payload);
  }

  return next(action);
};
