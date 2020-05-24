
import React, { Component } from 'react';
import classes from './Landing.module.css';
import IconFull from '../../components/UI/IconFull/IconFull';
import BackgroundSmall from '../../components/UI/backgrounds/BackgroundSmall/BackgroundSmall';
import Spinner from '../../components/UI/Spinner/Spinner';

class Landing extends Component {
    render () {
        return (
            <div  className={classes.Landing}>
                <BackgroundSmall className={classes.BackgroundSmall}>
                    <IconFull className={classes.Logo}/>
                    <Spinner className={classes.Spinner}/>
                </BackgroundSmall>
            </div>
        );
    }
}

export default Landing;