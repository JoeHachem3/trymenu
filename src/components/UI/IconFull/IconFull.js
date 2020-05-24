import React from 'react';
// import classes from './IconLogo.module.css';
import Logo from '../../../assets/images/logo/logo_full.svg';

const IconFull = (props) => (
    <img src={Logo} alt="Trymenu logo" className={props.className} />
);

export default IconFull;