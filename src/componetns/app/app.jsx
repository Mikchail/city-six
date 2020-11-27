import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Main from '../main/main.jsx';
import Offer from '../offer/offer.jsx';

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
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderAplication()}
          </Route>
          <Route path="/offer/:id">
           <Offer/>
          </Route>
          <Main />
        </Switch>
      </BrowserRouter>
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
