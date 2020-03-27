import React from "react";
import Main from "../main/main.jsx";


// const initialState = {
//   cities,
//   activeCity: cities[0],
//   offers: getOffersByCity(offers, cities[0].name),
//   sortType: `Popular`,
//   marker: null,
// }
const handleOfferHover = () => {
  console.log(`вот`);
};
// const {offersCords, offers, handleOfferHover,marker, activeCity} = props;
const App = props => {
  return (
    <div>
      <Main
        handleOfferHover={handleOfferHover}
      />
    </div>
  );
};

export default App;
