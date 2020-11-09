import React from 'react';
import classes from './buildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import { connect } from "react-redux";

const controls = [

    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];


const buildControls = props => (

    <div className={classes.buildControls}>

        <p className={classes.priceParagrah}>Current price: <strong>{props.price.toFixed(2)}</strong></p>

        { controls.map( (control, index) => <BuildControl 
                                                key={index} 
                                                label={control.label} 
                                                addIngredient = {() => props._addIngredient(control.type)}
                                                removeIngredient = {() => props._removeIngredient(control.type)} 
                                                displayDisabled={props.displayInfo[control.type]}/> ) }
    
        <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props._purchase}>{props.isAuth ? "ORDER NOW" : "SIGN IN TO ORDER"}</button>
    </div>
);


export default buildControls;