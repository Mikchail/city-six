import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import {CITIES} from '../../utils.js';

class PlaceCardList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers, listClass, handleOfferHover} = this.props;
    // eslint-disable-next-line react/prop-types
    console.log(handleOfferHover)
    return (
      <div
        className={`${
          listClass === CITIES
            ? `cities__places-list tabs__content`
            : `near-places__list`
        } places__list`}
      >
        {offers.map((offer, index) => {
          return (
            <PlaceCard
              key={index}
              offer={offer}
              cardClass={listClass}
              handleOfferHover={handleOfferHover}
            />
          );
        })}
      </div>
    );
  }
}
PlaceCardList.propTypes = {
  offers: PropTypes.array.isRequired,
};
export default PlaceCardList;
