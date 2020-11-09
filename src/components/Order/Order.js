import React from "react";
import classes from "./order.module.css";

const Order = (props) => {
  const { order } = props;

  const ingredientsFormated = Object.keys(order.ingredients).map((key) => (
    <div className={classes.ingredientsFormated}>
      <span>{key}({order.ingredients[key]})</span> &nbsp;
    </div>
  ));

  return (
    <div className={classes.order}>
      <div>
        <strong>Ingredients</strong>: {ingredientsFormated}
      </div>
      <br/>
      <div>
        <strong>Price</strong>: {order.price.toFixed(2)} $USD
      </div>
    </div>
  );
};

export default Order;
