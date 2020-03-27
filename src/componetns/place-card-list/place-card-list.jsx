import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";

class PlaceCardList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {offers, handleOfferHover} = this.props;
    return (
      <div className="places__list">
        {offers.map((offer, index) => {
          return <PlaceCard
            key={index}
            offer={offer}
            handleOfferHover={handleOfferHover}
          />;
        })}
      </div>
    );
  }
}
PlaceCardList.propTypes = {
  offers: PropTypes.array.isRequired
};
export default PlaceCardList;
