import React, { PureComponent } from 'react';
import Main from '../main/main.jsx';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
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
class App extends PureComponent {
  constructor(props) {
    super(props);
  }
  _renderAplication() {
    // eslint-disable-next-line react/prop-types
    const { loadCity, error } = this.props;
      
      
    if (!loadCity) {
      return <div>Loading</div>;
    }
    if (error) {
      return <div>ERROR</div>;
    }
    if (loadCity) {
      return <Main />;
    }

    return null;
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderAplication()}
          </Route>
          <Route exact path="/">
            {/* something */}
          </Route>
          <Main handleOfferHover={handleOfferHover} />
        </Switch>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
    loadCity: state[`OFFERS`].loadCity,
    error: state[`OFFERS`].error,
  };
};
export default connect(mapStateToProps)(App);
