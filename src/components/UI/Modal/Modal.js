import React from 'react';
import classes from './modal.module.css';
import Auxx from '../../../hoc/Auxx';
import Backdrop from '../Backdrop/Backdrop';


const modal = (props) => {
    return (

        <Auxx>

            <Backdrop show={props.show} clicked={props.modalClose}/>
            <div className={classes.modal}
            style={{ transform: props.show ? "translateY(0)" :  "translateY(-100vh)"}}>
                {props.children}
            </div>
        </Auxx>
    );
}


export default modal;