import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ButtonMenuToggle from '../ButtonMenuToggle/ButtonMenuToggle';
import classes from './toolbar.module.css';


const toolbar = (props) => (

    <header className={classes.toolbar}>
        {/* <div onClick={props._openSideDrawer}>MENU</div> */}
        <ButtonMenuToggle clicked={props._openSideDrawer}/>
        <Logo />
        <nav className={classes.desktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default toolbar;