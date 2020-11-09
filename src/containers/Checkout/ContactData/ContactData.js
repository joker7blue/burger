import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Loader from "../../../components/UI/Loader/Loader";
import Input from "../../../components/UI/Input/Input";
import classes from "./contactData.module.css";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    form: [
      {
        name: "name",
        elementType: "input",
        config: {
          type: "text",
          placeholder: "Your name",
        },
        touched: false,
        validation: {
          require: true,
          minLength: 3,
          maxLength: 20,
        },
        valid: false,
        value: "",
      },
      {
        name: "email",
        elementType: "input",
        config: {
          type: "email",
          placeholder: "Your email",
        },
        touched: false,
        validation: {
          require: true,
          minLength: 3,
          maxLength: 20,
        },
        valid: false,
        value: "",
      },
      {
        name: "zipcode",
        elementType: "input",
        config: {
          type: "text",
          placeholder: "ZIP code",
        },
        touched: false,
        validation: {
          require: true,
          minLength: 3,
          maxLength: 20,
        },
        valid: false,
        value: "",
      },
      {
        name: "street",
        elementType: "input",
        config: {
          type: "text",
          placeholder: "Street",
        },
        touched: false,
        validation: {
          require: true,
          minLength: 3,
          maxLength: 20,
        },
        valid: false,
        value: "",
      },
      {
        name: "deliverymethod",
        elementType: "select",
        touched: false,
        config: {
          options: [
            { valueOption: "Fast method" },
            { valueOption: "Low method" },
          ],
        },
        validation: false,
        value: "",
      },
    ],
  };

  componentDidMount() {
    console.log(this.props);
  }

  _inputHandler = ($event, id) => {
    const updatedForm = [...this.state.form];
    /* const updatedFormElement = {...updatedForm[id]}; */
    const updatedFormElement = updatedForm[id];
    updatedFormElement.value = $event.target.value;
    updatedFormElement.valid = this.checkValidity(
      $event.target.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[id] = updatedFormElement;

    this.setState({ form: updatedForm });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return isValid;
    }

    if (rules.require) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  _orderHandler = ($event) => {
    $event.preventDefault();
    const formData = {};
    this.state.form.forEach((elt) => {
      formData[elt.name] = elt.value;
    });

    const order = {
      ingredients: this.props.ingrds,
      price: this.props.ttPrice,
      oder: formData,
      userId: this.props.userId
    };

    this.props.purchageBurger(order,this.props.token);
  };

  render() {

    let form = (
      <form>
        <h2>Enter your contact data</h2>

        {/* <input type="text" placeholder="Your name" />
        <input type="text" placeholder="Your email" />
        <input type="text" placeholder="Your postal code" />
        <input type="text" placeholder="Your street" /> */}
        {this.state.form.map((elt, index) => (
          <Input
            key={index}
            elementType={elt.elementType}
            config={elt.config}
            inputHandler={(event) => this._inputHandler(event, index)}
            toValidate={elt.validation}
            invalid={!elt.valid}
            touched={elt.touched}
          />
        ))}

        <Button btnType="success" clicked={this._orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = (
        <h1 style={{ textAlign: "center" }}>
          Processing...
          <br />
          <br /> <Loader />
        </h1>
      );
    }

    return <div className={classes.contactData}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.order.loading,
    ingrds: state.ingrds.ingredients,
    ttPrice: state.ingrds.totalPrice,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    purchageBurger: (orderData, token) =>
      dispatch(burgerBuilderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
