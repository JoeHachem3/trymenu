import React from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  const ModalClasses = [classes.Modal];
  return (
    <>
      <Backdrop onClick={props.closeModal} />
      <div className={ModalClasses.join(' ')}>
        {/* <button className={classes.CloseBtn} onClick={props.closeModal}>
          <img src={closeIcon} alt='close icon' />
        </button>
        <br /> */}
        {props.children}
      </div>
    </>
  );
};

export default Modal;
