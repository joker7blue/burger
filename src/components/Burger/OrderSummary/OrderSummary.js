import React from "react";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const { ingredients } = props;

  const toShow = Object.keys(ingredients).map((igKey) => (
    <li key={igKey}>
      {igKey}: {ingredients[igKey]}
    </li>
  ));

  return (
    <div>
      <h1> Oder summary </h1>
      <ul>{toShow}</ul>

      <Button btnType="danger" clicked={props.purchasingCancel}>
        CANCEL
      </Button>
      <Button btnType="success" clicked={props.purchasingContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default orderSummary;
