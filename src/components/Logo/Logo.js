import React from 'react';
import logoImg from '../../assets/images/logo.png';
import classes from './logo.module.css';

const logo = (props) => (

    <div className={classes.logo} style={{height: props.height}}>
        <img src={logoImg} alt="logo"/>
    </div>
);

export default logo;