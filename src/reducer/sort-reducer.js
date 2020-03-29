import {extend} from '../utils.js';

import {ActionType} from '../constants';

const initialState = {
  sortType: `Popular`,
  marker: null,
};

export const reducer = (state = initialState, action) => {
 
  switch (action.type) {
    case ActionType.SORT_OFFERS:
      return extend(state, {marker: action.payload});
    case ActionType.HIGHLIGHT_MARKER:
      return extend(state, {marker: action.payload});
    default:
      return state;
  }
};
