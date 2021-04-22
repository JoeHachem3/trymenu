import React from 'react';
import classes from './Modal.module.css';
import closeIcon from '../../../assets/images/close_icon.svg'
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
    const ModalClasses = [classes.Modal]
    return (
        <>
            {/* <Backdrop show={props.show} clicked={props.modalClosed}/> */}
            <div className={classes.backdrop}>
                <div className={ModalClasses.join(' ')} >
                <button className={classes.CloseBtn} onClick={props.modalClosed}><img src={closeIcon} alt="close icon"/></button>
                <br/>
                {props.children}
                </div>
            </div>
        </>
    );
}


export default Modal;