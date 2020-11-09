import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from "react-redux";
import * as burgerBuiderActions from "../../../store/actions/index";

class Logout extends Component {

    componentDidMount() {
        this.props.logout()
    }
    
    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () =>
        dispatch(burgerBuiderActions.logout()),
    };
  };

export default connect(null, mapDispatchToProps)(Logout)