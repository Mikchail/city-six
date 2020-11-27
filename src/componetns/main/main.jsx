import React from 'react';
import PlaceCardList from '../place-card-list/place-card-list.jsx';
import Map from '../map/map.jsx';
import {selectOffers} from '../../reducer/cities-selectors';
import {connect} from 'react-redux';
import {ActionCreator} from '../../actions/action-creator';
import {CITIES} from '../../utils.js';
import SortOptions from '../sort-options/sort-options.jsx';
import LocationList from '../location-list/loacation-list.jsx';

const Main = (props) => {
  // eslint-disable-next-line react/prop-types
  const {offers, handleOfferHover, marker, activeCity} = props;
  const advertsCount = offers.length;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {advertsCount} places to stay in {activeCity.name}
              </b>
              <SortOptions />
              <PlaceCardList
                offers={offers}
                handleOfferHover={handleOfferHover}
                listClass={CITIES}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offers} marker={marker} activeCity={activeCity} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  offers: selectOffers(state),
  activeCity: state[`OFFERS`].activeCity,
  marker: state[`SORT`].marker,
});
const mapDispatchToProps = (dispatch) => ({
  handleOfferHover: (offer) => {
    dispatch(ActionCreator.highlightMarker(offer));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Main);
