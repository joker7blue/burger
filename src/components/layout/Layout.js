import React, { Component } from "react";
import Auxx from "../../hoc/Auxx";
import Toolbar from "../navigation/Toolbar/Toolbar";
import SideDrawer from "../navigation/SideDrawer/SideDrawer";
import classes from "./layout.module.css";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <Auxx>
        <Toolbar
          isAuth={this.props.isAuth}
          _openSideDrawer={this.sideDrawerOpenHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuth}
          showSideDrawer={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.container}>{this.props.children}</main>
      </Auxx>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
