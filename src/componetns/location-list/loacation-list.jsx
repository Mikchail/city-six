import React from 'react';
import PropTypes from 'prop-types';
import LocationListItem from '../location-item/location-item.jsx';

import {connect} from 'react-redux';

const LocationList = (props) => {
  const {cities} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => {
        return <LocationListItem key={city.name} city={city} />;
      })}
    </ul>
  );
};

LocationList.propTypes = {
  cities: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    cities: state[`OFFERS`].cities,
  };
};

export default connect(mapStateToProps)(LocationList);
