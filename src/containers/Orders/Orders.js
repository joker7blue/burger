import React, { Component } from "react";
import classes from "./orders.module.css";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Loader from "../../components/UI/Loader/Loader";
import * as burgerBuilderActions from "../../store/actions/index";
import { connect } from "react-redux";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }

  render() {
    console.log(this.props.orders);
    let ordersList = this.props.orders.map((order, index) => (
      <Order order={order} key={index} />
    ));

    if (this.props.loading) {
      ordersList = <Loader />;
    }

    return <div className={classes.orders}>{ordersList}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) => dispatch(burgerBuilderActions.fetchOrder(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, axios));
