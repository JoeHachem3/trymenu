import React from 'react';
import Logo from '../../../assets/images/logo_white.svg';
import classes from './style.module.css';

const MenuItem = (props) => {
  return (
    <input
      className={props.active ? classes.menubtn : classes.menubtninactive}
      type='button'
      value={'◼︎     ' + props.label}
      onClick={props.onpress}
    />
  );
};

const SideBar = (props) => {
  return (
    <div className={classes.sidebar}>
      <img
        src={Logo}
        alt='trymenu logo'
        height='200'
        className={classes.logo}
      />

      {props.tables?.map((x, index) => (
        <MenuItem
          active={props.selected === x}
          label={x}
          onpress={() => props.onset(x)}
        />
      ))}

      <input
        className={classes.logoutbtn}
        type='button'
        value={'Logout'}
        onClick={props.logout}
      />
      {props.type === 'admin' ? (
        <input
          className={classes.updatebtn}
          type='button'
          value={'Update school'}
          onClick={props.handleUpdate}
        />
      ) : null}
    </div>
  );
};

export default SideBar;
