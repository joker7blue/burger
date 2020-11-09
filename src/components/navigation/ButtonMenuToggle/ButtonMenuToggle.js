import React from 'react';
import classes from './buttonMenuToggle.module.css';

const buttonMenuToggle = (props) => {
    return (
        <div className={classes.buttonMenuToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default buttonMenuToggle;
