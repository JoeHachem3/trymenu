import React from 'react';
import classes from './Menu.module.css';
import Button from '../UI/Buttons/Button/Button';
const Menu = (props) => {
  return (
    <div className={classes.Menu}>
      <div className={classes.Menu}>{props.output}</div>
      <div className={classes.doneBtn}>
        <Button clicked={props.updatesFinished}>Done</Button>
      </div>
    </div>
  );
};

export default Menu;
