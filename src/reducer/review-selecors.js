import {NameSpace} from "../constants";


export const getReviews = (state) => ({
  reviews: state[NameSpace.REVIEW].reviews,
  isErrorReviews: state[NameSpace.REVIEW].isErrorReviews,
  isLoadingReviews: state[NameSpace.REVIEW].isLoadingReviews
})
