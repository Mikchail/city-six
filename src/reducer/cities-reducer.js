import {ActionType} from '../constants';
import {extend, getCities} from '../utils.js';

import {ActionCreator} from '../actions/action-creator';

const initialState = {
  loadCity: null,
  error: null,
  cities: [],
  activeCity: null,
  offers: [],
};

// ================================

export const Operations = {
  download: () => (dispatch, getState, api) => {
    return api
      .get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadOffers(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      const cities = getCities(action.payload);
      return extend(state, {
        loadCity: true,
        cities,
        offers: action.payload,
        activeCity: cities[0],
      });
    case ActionType.CHANGE_CITY:
      return extend(state, {activeCity: action.payload});
    case ActionType.GET_ERROR:
      return extend(state, {error: action.payload, loadCity: `fail`});
    default:
      return state;
  }
};
