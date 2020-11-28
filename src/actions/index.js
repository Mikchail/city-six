import { ActionType } from '../constants';


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