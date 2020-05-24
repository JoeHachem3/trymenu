import React from 'react';
import classes from './BackgroundSmall.module.css';
// import back from '../../../../assets/images/card_small.svg';

const BackgroundSmall = (props) => (
    <div className={classes.BackgroundSmall}>
        <div className={classes.BackgroundDiv + ' ' + props.className}>
            {props.children}
        </div>
    </div>
);

export default BackgroundSmall;