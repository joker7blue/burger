import React from "react";
import classes from "./input.module.css";

const Input = (props) => {
  let InputElement;
  let classesInput = [classes.input]

  if (props.invalid && props.toValidate && props.touched) {
    classesInput.push(classes.inputInvalid)
  }

  switch (props.elementType) {
    case "input":
      InputElement = (
        <input
          className={classesInput.join(' ')}
          {...props.config}
          value={props.value}
          onChange={props.inputHandler}
        />
      );
      break;
    case "textarea":
      InputElement = (
        <textarea
          className={classesInput.join(' ')}
          {...props.config}
          value={props.value}
          onChange={props.inputHandler}
        />
      );
      break;
    case "select":
      InputElement = (
        <select className={classesInput.join(' ')} onChange={props.inputHandler} value={props.value}>
          {props.config.options.map((option, index) => (
            <option value={option.valueOption} key={index}>
              {option.valueOption}
            </option>
          ))}
        </select>
      );
      break;
    default:
      InputElement = (
        <input
          className={classesInput.join(' ')}
          type="text"
          {...props.config}
          value={props.value}
        />
      );
      break;
  }
  return <div className={classes.formGroup}>{InputElement}</div>;
};

export default Input;
