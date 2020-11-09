import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxx from '../../../hoc/Auxx';
import classes from './sideDrawer.module.css';

const sideDrawer = (props) => {

    let classes_drawer = [classes.sideDrawer];
    if (props.showSideDrawer) {
        classes_drawer.push(classes.open)
    } else {
        classes_drawer.push(classes.close)
    }

    return (

        <Auxx>
            <Backdrop show={props.showSideDrawer} clicked={props.closed}/>
            <div className={classes_drawer.join(' ')}>
                <Logo height="11%"/>
                <nav>
                <NavigationItems />
                </nav>
            </div>
        </Auxx>
    )
}

export default sideDrawer;
