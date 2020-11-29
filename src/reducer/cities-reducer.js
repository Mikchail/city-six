import {ActionType} from '../constants';
import {extend, getCities} from '../utils.js';

import {ActionCreator} from '../actions/action-creator';

const initialState = {
  loadCity: null,
  error: null,
  cities: [],
  activeCity: null,
  offers: [],
  favorites: []
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
  downloadFavorites: () => (dispatch, getState, api) => {
    return api
      .get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteOffers(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },
  changeStatusOffer: (id, status) => (dispatch, getState, api) => {
    return api
      .post(`/favorite/${id}/${status}`)
      .then((response) => {
        dispatch(ActionCreator.changeFavorite({id, status}));
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
    case ActionType.CHANGE_FAVORITE_CITY:
      const {id, status} = action.payload;
      const offerIndex = state.offers.findIndex(it => it.id === id);
      const offer = state.offers[offerIndex]
      const newOffer = {
        ...offer,
        is_favorite: Boolean(status)
      }
      const offers = [...state.offers.slice(0, offerIndex), newOffer, ...state.offers.slice(offerIndex + 1)]
      return extend(state, {offers: offers});
    case ActionType.GET_ERROR:
      return extend(state, {error: action.payload, loadCity: `fail`});
    case ActionType.LOAD_FAVORITE_OFFERS:
      return extend(state, {favorites: action.payload});
    default:
      return state;
  }
};
