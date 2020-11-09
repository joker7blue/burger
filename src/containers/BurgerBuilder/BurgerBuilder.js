import React, { Component } from "react";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Auxx from "../../hoc/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Loader from "../../components/UI/Loader/Loader";

import axios from "../../axios-orders";
import * as burgerBuiderActions from "../../store/actions/index";
import { connect } from "react-redux";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchase: false,
  };

  componentDidMount() {
    /* axios
      .get("https://react-burger-builder-64215.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true });
      }); */

    /*this.setState({
      ingredients: { salad: 0, bacon: 0, cheese: 1, meat: 0 },
    });*/
    this.props.fetch_initIngredients();
  }

  /*_addIngredientHandler = (typeIngredient) => {
    const oldCount = this.state.ingredients[typeIngredient];
    const updatedCounted = oldCount + 1;
    let ingredientsUpdated = { ...this.state.ingredients };
    ingredientsUpdated[typeIngredient] = updatedCounted;

    const oldTotalPrice = this.state.totalPrice;
    const priceAddition = INGREDIENTS_PRICE[typeIngredient];
    const newTotalprice = oldTotalPrice + priceAddition;

    this.setState({
      ingredients: ingredientsUpdated,
      totalPrice: newTotalprice,
    });

    this.updatePurchasable(ingredientsUpdated);
  };

  _removeIngredientHandler = (typeIngredient) => {
    const oldCount = this.state.ingredients[typeIngredient];
    const updatedCounted = oldCount - 1;

    if (updatedCounted < 0) {
      return;
    }

    let ingredientsUpdated = { ...this.state.ingredients };
    ingredientsUpdated[typeIngredient] = updatedCounted;

    const oldTotalPrice = this.state.totalPrice;
    const priceremoved = INGREDIENTS_PRICE[typeIngredient];
    const newTotalprice =
      oldTotalPrice - priceremoved >= 4 ? oldTotalPrice - priceremoved : 4;

    this.setState({
      ingredients: ingredientsUpdated,
      totalPrice: newTotalprice,
    });

    this.updatePurchasable(ingredientsUpdated);
  };*/

  _purchasable = () => {
    const sum = Object.keys(this.props.ingrds)
      .map((igKey) => this.props.ingrds[igKey])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  _purchase = () => {

    if (this.props.isAuth) {
      
      this.setState({ purchase: true });
    }else{
      this.props.setAuthRedirect("/checkout")
      this.props.history.push("/auth")
    }
  };

  _purchasingCancelHandler = () => {
    this.setState({ purchase: false });
  };

  _purchasingContinueHandler = () => {
    //alert('continue purchasing');
    /* this.setState({ loading: true });*/

    /*let query = "";
    for (const key in this.state.ingredients) {
      query +=
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(this.state.ingredients[key]) +
        "&";
    }
    query +=
      encodeURIComponent("totalPrice") +
      "=" +
      encodeURIComponent(this.state.totalPrice);

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + query,
    });*/
    this.props.initPurchase()
    this.props.history.push("/checkout");
  };

  render() {
    let displayInfo = { ...this.props.ingrds };

    for (const key in displayInfo) {
      displayInfo[key] = displayInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Unable to load ingredients</p> : null;

    if (this.props.ingrds) {
      burger = (
        <Auxx>
          <Burger ingredients={this.props.ingrds} />
          <BuildControls
            _addIngredient={this.props.addIngredient}
            _removeIngredient={this.props.removeIngredient}
            price={this.props.ttPrice}
            displayInfo={displayInfo}
            purchasable={this._purchasable()}
            _purchase={this._purchase}
            isAuth={this.props.isAuth}
          />
        </Auxx>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingrds}
          purchasingCancel={this._purchasingCancelHandler}
          purchasingContinue={this._purchasingContinueHandler}
        />
      );
    }

    if (this.props.loading) {
      orderSummary = <Loader />;
      burger = <Loader />;
    }

    return (
      <Auxx>
        <Modal
          show={this.state.purchase}
          modalClose={this._purchasingCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxx>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingrds: state.ingrds.ingredients,
    ttPrice: state.ingrds.totalPrice,
    loading: state.ingrds.loading,
    error: state.ingrds.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (key) => dispatch(burgerBuiderActions.addIngredient(key)),
    removeIngredient: (key) =>
      dispatch(burgerBuiderActions.removeIngredient(key)),
    fetch_initIngredients: () =>
      dispatch(burgerBuiderActions.fetch_initIngredient()),
    initPurchase: () => dispatch(burgerBuiderActions.purchaseInit()),
    setAuthRedirect: (path) => dispatch(burgerBuiderActions.setAuthRedirect(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
