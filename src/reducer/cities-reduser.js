import { ActionType } from '../constants';
import { extend, getCities, SortTypes, getOffersByCity } from '../utils.js';
import { createSelector } from 'reselect';

import { loadOffers } from '../actions/cities-action';

const initialState = {
  loadCity: null,
  error: null,
  cities: [],
  activeCity: null,
  offers: [],
};

export const getSortType = state => {
  return state[`SORT`].sortType;
};

function getActieCity(state) {
  return state[`OFFERS`].activeCity;
}
function getCitiesList(state) {
  return state[`OFFERS`].cities;
}
function getOffers(state) {
  return state[`OFFERS`].offers;
}
const getOffersByActiveCity = createSelector(
  [getOffers, getActieCity],
  (offers, activeCity) => getOffersByCity(offers, activeCity.name)
);

function getSortedOffers(offers, sortType) {
  switch (sortType) {
    case SortTypes.PRICE_TO_LOW:
      return offers.slice().sort((a, b) => b.price - a.price);
    case SortTypes.PRICE_TO_HIGH:
      return offers.slice().sort((a, b) => a.price - b.price);
    case SortTypes.TOP_RATED:
      return offers.slice().sort((a, b) => b.rating - a.rating);
  }
  return offers;
}
export const sortOffersBySortType = createSelector(
  [getOffersByActiveCity, getSortType],
  (offers, sortType) => getSortedOffers(offers, sortType)
);

export const Operation = {
  download: () => (dispatch, getState, api) => {
    return api
      .get(`/hotels`)
      .then(response => {
        dispatch(loadOffers(response.data));
      })
      .catch(err => {
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
      return extend(state, { activeCity: action.payload });
    case ActionType.GET_ERROR:
      return extend(state, { error: action.payload, loadCity: `fail` });
    default:
      return state;
  }
};
export const selectOffers = state => {
  return sortOffersBySortType(state);
};
