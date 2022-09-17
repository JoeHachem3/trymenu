import React from 'react';
import classes from './Header.module.css';

const Header2 = (props) => {
  return (
    <>
      <header className={classes.Header}>
        <div className={classes.Parent}>{props.children}</div>
      </header>
    </>
  );
};

export default Header2;
