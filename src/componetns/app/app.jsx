import React, {PureComponent} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import history from '../../history'
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import Offer from '../offer/offer.jsx';
import SingIn from "../signin/signin";
import Favorite from "../favorite/favorite";
import Footer from "../footer/footer";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }
  _renderAplication() {
    // eslint-disable-next-line react/prop-types
    const {loadCity, error} = this.props;

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
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            {this._renderAplication()}
          </Route>
          <Route path="/offer/:id">
            {this.props.loadCity ? <Offer/> : <div>Loading</div>}
          </Route>
          <Route path="/sign-in">
            <SingIn/>
          </Route>

          <Route path="/favorites">
            <Favorite/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loadCity: state[`OFFERS`].loadCity,
    error: state[`OFFERS`].error,
  };
};
export default connect(mapStateToProps)(App);
