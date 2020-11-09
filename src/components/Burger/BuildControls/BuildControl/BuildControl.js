import React from 'react';
import classes from './buildControl.module.css';


const buildcontrol = props => (
    
        <div className={classes.buildControl}>
            <div className={classes.label}>{props.label}</div>
            <button className={classes.less} onClick={props.removeIngredient} disabled={props.displayDisabled}>Less</button>
            <button className={classes.more} onClick={props.addIngredient}>More</button>
        </div>
    );



export default buildcontrol;