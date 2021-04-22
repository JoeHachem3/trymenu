import React from 'react';
import classes from './IconLogo.module.css';
import Logo from '../../../assets/images/logo/logo_full.svg';

const IconFull = (props) => {
  const classNames = [classes.logo];
  if (props.loading) {
    classNames.push(classes.loading);
  }
  return (
    <>
      <img src={Logo} alt='Trymenu logo' className={props.className} />

      {/* <h1 className={classNames.join(' ')}>
        TRYME
        <span className={classes.new}>
          N<span className={classes.eu}>EU</span>
          <span className={classes.u}>U</span>
        </span>
      </h1> */}
    </>
  );
};

export default IconFull;
