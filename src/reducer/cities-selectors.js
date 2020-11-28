import {createSelector} from 'reselect';
import {extend, getCities, SortTypes, getOffersByCity} from '../utils.js';
import {NameSpace} from '../constants';

export const selectOffers = (state) => {
  return sortOffersBySortType(state);
};


export const getSortType = (state) => {
  return state[`SORT`].sortType;
};

export function getActieCity(state) {
  return state[`OFFERS`].activeCity;
}

export function getCitiesList(state) {
  return state[NameSpace.OFFERS].cities;
}

export function getOffers(state) {
  return state[`OFFERS`].offers;
}

export function getOfferById(state) {
  const offers = state[NameSpace.OFFERS].offers;
  return (id) => {
    return offers.find((it) => it.id === id)
  }
  //
}

// =======================================
// =========================================================================
// ==========================================================================================================

export const getOffersByActiveCity = createSelector(
  [getOffers, getActieCity],
  (offers, activeCity) => getOffersByCity(offers, activeCity.name)
);


export function getSortedOffers(offers, sortType) {
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

export const sortOffersBySortType = createSelector([
  getOffersByActiveCity,
  getSortType,
], (offers, sortType) => getSortedOffers(offers, sortType));
