import React, { Component } from "react";
import Layout from "../components/layout/Layout";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "../containers/Checkout/Checkout";
import Orders from "./Orders/Orders";
import Auth from "./Auth/Auth";
import Logout from "./Auth/Logout/Logout";
import { connect } from "react-redux";
import * as burgerBuiderActions from "../store/actions/index";
//import classes from './App.module.css';

class App extends Component {
  state = {
    show: true,
  };

  componentDidMount() {
    this.props.tryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );

    if (!this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryAutoSignIn: () => dispatch(burgerBuiderActions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
