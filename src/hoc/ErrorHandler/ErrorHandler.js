import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import classes from './ErrorHandler.module.css';

const ErrorHandler = (props) => {
  return props.showModal ? (
    <Modal closeModal={props.closeModal}>
      <div className={classes.ErrorHandler}>
        <h3>{'Server Error'}</h3>
        <p className={'errorMessage'}>{props.errorMessage}</p>
      </div>
    </Modal>
  ) : (
    <>{props.children}</>
  );
};

export default ErrorHandler;
