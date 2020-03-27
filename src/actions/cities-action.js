import {ActionType} from "../constants";


export const loadOffers = (payload) => ({
  type: ActionType.LOAD_OFFERS,
  payload
});


export const changeCites = (payload) => ({
  type: ActionType.CHANGE_CITY,
  payload
});


export const getError = (payload) => ({
  type: ActionType.GET_ERROR,
  payload
});


export const sortOffers = (payload) => {
  return {
    type: ActionType.SORT_OFFERS,
    payload
  };
};

export const highlightMarker = (payload) => {
  return {
    type: ActionType.HIGHLIGHT_MARKER,
    payload
  };
};
