import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./navigationItems.module.css";

const navigationItems = (props) => (
  <ul className={classes.navigationItems}>
    <NavigationItem link="/">Burger</NavigationItem>
    {props.isAuth ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}

    {props.isAuth ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Authentication</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
