import React from 'react';
import classes from './Menu.module.css';
import Button from '../UI/Button/Button';
const Menu = (props) => {
  return (
    <div className={classes.Menu}>
      <div className={classes.Menu}>{props.output}</div>
      <Button clicked={props.updatesFinished}>Done</Button>
    </div>
  );
};

export default Menu;
