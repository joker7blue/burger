import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import OrderCheckoutSummary from "../../components/Burger/OrderCheckoutSummary/OrderCheckoutSummary";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import ContactData from "./ContactData/ContactData";
import Auxx from "../../hoc/Auxx";
import Loader from "../../components/UI/Loader/Loader";

import { connect } from "react-redux";


class Checkout extends Component {
  state = {};

  /*componentDidMount() {
    
    const queryFormated = new URLSearchParams(this.props.location.search)
    let ingredients = {};
    queryFormated.forEach((value, key) => { 
      if (key !== 'totalPrice') {
        ingredients[key] = Number(value)
      }
    })
    
    this.setState({
      ingredients: ingredients,
      totalPrice: Number(queryFormated.get('totalPrice')),
    });
  }*/

  _cancelOrderHandler = () => {
    this.props.history.goBack();
  };

  _continueOrderHandler = () => {
    this.props.history.push(this.props.match.path + "/contact-data");
  };

  render() {
    let orderSummary = <Redirect to="/" />;
    const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null

    if (this.props.ingrds) {
      orderSummary = (
        <Auxx>
          {purchaseRedirect}
          <OrderCheckoutSummary
            ingredients={this.props.ingrds}
            cancelOrder={this._cancelOrderHandler}
            continueOrder={this._continueOrderHandler}
          />

          <Route
            path={this.props.match.path + "/contact-data"}
            component={() => (
              <ContactData
                ingredients={this.props.ingrds}
                totalPrice={this.props.ttPrice}
              />
            )}
          />
        </Auxx>
      );
    }

    return <div>{orderSummary}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingrds: state.ingrds.ingredients,
    ttPrice: state.ingrds.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
