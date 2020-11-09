import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Loader from "../../components/UI/Loader/Loader";
import classes from "./auth.module.css";
import * as burgerBuiderActions from "../../store/actions/index";
import { connect } from "react-redux";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        config: {
          type: "email",
          placeholder: "Your email adress",
        },
        touched: false,
        validation: {
          require: true,
          isEmail: true,
          minLength: 3,
          maxLength: 20,
        },
        valid: false,
        value: "",
      },
      password: {
        elementType: "input",
        config: {
          type: "password",
          placeholder: "Your password",
        },
        touched: false,
        validation: {
          require: true,
          minLength: 6,
        },
        valid: false,
        value: "",
      },
    },

    isSignUp: false,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.setAuthRedirect();
    }
  }

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

  _switchHandler = () => {
    this.setState({ isSignUp: !this.state.isSignUp });
  };

  _inputHandler = ($event, key) => {
    const updatedForm = { ...this.state.controls };
    /* const updatedFormElement = {...updatedForm[id]}; */
    const updatedFormElement = updatedForm[key];
    updatedFormElement.value = $event.target.value;
    updatedFormElement.valid = this.checkValidity(
      $event.target.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[key] = updatedFormElement;

    this.setState({ controls: updatedForm });
  };

  _onSubmitHandler = () => {
    this.props.authenticate(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formArray = [];
    let form;
    let errorMessage = null;
    let authRedirect = null;

    for (const key in this.state.controls) {
      formArray.push({ control: this.state.controls[key], id: key });
    }

    form = formArray.map((elt) => (
      <Input
        key={elt.id}
        elementType={elt.control.elementType}
        config={elt.control.config}
        inputHandler={(event) => this._inputHandler(event, elt.id)}
        toValidate={elt.control.validation}
        invalid={!elt.control.valid}
        touched={elt.control.touched}
      />
    ));

    if (this.props.loading) {
      form = <Loader />;
    }

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.name + ": " + this.props.error.message}</p>
      );
    }

    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.auth}>
        <div className={classes.authForm}>
          <h1>{this.state.isSignUp ? "SIGN UP" : "SIGN IN"}</h1>
          {errorMessage}
          {form}
          {authRedirect}
          <Button btnType="success" clicked={this._onSubmitHandler}>
            SUBMIT
          </Button>
          <br />
          <Button btnType="danger" clicked={this._switchHandler}>
            {this.state.isSignUp ? "SWITCH TO SIGN IN" : "SWITCH TO SIGN UP"}
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.ingrds.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (email, password, isSignUp) =>
      dispatch(burgerBuiderActions.auth(email, password, isSignUp)),
    setAuthRedirect: () => dispatch(burgerBuiderActions.setAuthRedirect("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
