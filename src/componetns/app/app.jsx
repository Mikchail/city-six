import React from "react";
import PropTypes from "prop-types";
import Main from '../main/main.jsx';
import {createOffers} from '../../mocks/offers.js';
import { getCities,extend,getOffersByCity } from "../../utils.js";

const OFFERS_QUANTITY = 8;
const offers = createOffers(OFFERS_QUANTITY);

const cities = getCities(offers);
// const initialState = {
//   cities,
//   activeCity: cities[0],
//   offers: getOffersByCity(offers, cities[0].name),
//   sortType: `Popular`,
//   marker: null,
// }
const handleOfferHover = () => {
  console.log(`вот`)
}
// const {offersCords, offers, handleOfferHover,marker, activeCity} = props;
const App = (props) => {
  return (
    <div>

    <Main
      offers={getOffersByCity(offers, cities[0].name)}
      activeCity={cities[0]}
      sortType={`Popular`}
      marker={null}
      handleOfferHover={handleOfferHover}
    />
    </div>
  );
};
App.propTypes = {
  data: PropTypes.array
};

export default App;
