import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

export const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map( igKey => {

        return [...Array(props.ingredients[igKey])].map( (_, index) => {

            return <BurgerIngredient key={igKey+index} typeIngredient={igKey}/>
        }); 
    }).reduce( (arr, arrSuiv) => { return arr.concat(arrSuiv); } , [])

    if (transformedIngredients.length <= 0) {
        transformedIngredients = <h3>Please start adding incredients</h3>;
    }

    return (
        <div className={classes.burger}>
            <BurgerIngredient typeIngredient="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient typeIngredient="bread-bottom"/>
        </div>
    );
}


export default burger;
