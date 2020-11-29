import {ActionType} from '../constants';

export const ActionCreator = {
  loadOffers: (payload) => ({
    type: ActionType.LOAD_OFFERS,
    payload,
  }),
  loadFavoriteOffers: (payload) => ({
    type: ActionType.LOAD_FAVORITE_OFFERS,
    payload,
  }),
  changeFavorite: (payload) => ({
  type: ActionType.CHANGE_FAVORITE_CITY,
  payload,
}),
  changeCity: (payload) => ({
    type: ActionType.CHANGE_CITY,
    payload,
  }),
  getError: (payload) => ({
    type: ActionType.GET_ERROR,
    payload,
  }),
  sortOffers: (payload) => ({
    type: ActionType.SORT_OFFERS,
    payload,
  }),
  highlightMarker: (payload) => ({
    type: ActionType.HIGHLIGHT_MARKER,
    payload,
  }),
};
