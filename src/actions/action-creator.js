import {ActionType} from '../constants';

export const ActionCreator = {
  loadOffers: (payload) => ({
    type: ActionType.LOAD_OFFERS,
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
