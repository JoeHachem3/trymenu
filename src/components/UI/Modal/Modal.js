import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  const ModalClasses = [classes.Modal];
  return (
    <>
      <Backdrop show={props.show} onClick={props.modalClosed} />
      <div className={ModalClasses.join(' ')}>
        {/* <button className={classes.CloseBtn} onClick={props.modalClosed}>
          <img src={closeIcon} alt='close icon' />
        </button>
        <br /> */}
        {props.children}
      </div>
    </>
  );
};

export default Modal;
