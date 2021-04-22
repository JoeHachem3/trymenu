import React from 'react';
import classes from './LangButton.module.css';
import flag_en from '../../../../assets/images/flag_en.svg';
import { withRouter } from 'react-router-dom';

const LangButton = (props) => {
    return(
        <button className={classes.Button} onClick={() => {}}>
            <img src={flag_en} alt={'en'}/>
            <span>{'en'}</span>
        </button>
    );
}

export default withRouter(LangButton);