import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import LocationListItem from '../location-item/location-item.jsx'

import {connect} from 'react-redux'

const LocationList = (props) => {
  const {cities} = props;

  return (
    <ul className="locations__list tabs__list">
        {cities.map((city)=>{
          <LocationListItem
            key={city.name}
            city={city}
          />

        })}

      </ul>

  )

}

const mapStateToProps = ({OFFERS: {cities}}) =>{
  return {
    cities
  }
}

export default connect(mapStateToProps)(LocationList);
