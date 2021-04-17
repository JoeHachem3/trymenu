import React from 'react';
import classes from './Menu.module.css';

const Menu = (props) => {
  return <div className={classes.Menu}>{props.output}</div>;
};

export default Menu;
