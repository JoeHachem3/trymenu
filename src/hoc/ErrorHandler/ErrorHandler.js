import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import classes from './ErrorHandler.module.css';

const ErrorHandler = (props) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (props.error) setShowModal(true);
  }, [props]);

  const closeModal = () => {
    setShowModal(false);
    props.setError(false);
  };

  return showModal ? (
    <Modal closeModal={closeModal}>
      <div className={classes.ErrorHandler}>
        <h3>{'Server Error'}</h3>
        <p className={'errorMessage'}>{props.error?.message}</p>
      </div>
    </Modal>
  ) : null;
};

export default ErrorHandler;
