import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../actions/action-creator';
import {connect} from 'react-redux';

class LocationListItem extends PureComponent {
  constructor(props) {
    super(props);
    this._handleCityClick = this._handleCityClick.bind(this);
  }

  _handleCityClick(e) {
    e.preventDefault();
    this.props.handleCityClick(this.props.city);
  }

  render() {
    // eslint-disable-next-line react/prop-types,no-unused-vars
    const {activeCity, city} = this.props;

    return (
      <li className="locations__item">
        {/* eslint-disable-next-line react/prop-types */}
        <a
          className={`locations__item-link tabs__item
           ${activeCity.name === city.name ? ` tabs__item--active` : ``}`}
          onClick={this._handleCityClick}
          href="#"
        >
          <span>{city.name}</span>
        </a>
      </li>
    );
  }
}

// LocationListItem.propsTypes = {
//   activeCity: PropTypes.string.isRequired,
//   city: PropTypes.string.isRequired
// };

const mapStateToProps = (state) => ({
  activeCity: state[`OFFERS`].activeCity,
});

const mapDispatchToProps = (dispatch) => ({
  handleCityClick(activeCity) {
    dispatch(ActionCreator.changeCity(activeCity));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationListItem);
