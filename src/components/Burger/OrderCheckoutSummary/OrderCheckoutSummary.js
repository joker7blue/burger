import React from 'react';
import Burger from '../Burger';
import Button from '../../UI/Button/Button';
import classes from './orderCheckoutSummary.module.css';


const orderCheckoutSummary = (props) => {

    return (
        <div className={classes.orderCheckoutSummary}>
            <h1> We hope it taste well! </h1>
            <Burger ingredients={props.ingredients} />

            <Button btnType="danger" clicked={props.cancelOrder}>CANCEL</Button>
            <Button btnType="success" clicked={props.continueOrder}>CONTINUE</Button>
        </div>
    )

}


export default orderCheckoutSummary;
