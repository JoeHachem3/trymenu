import React from 'react';
import classes from './ItemThumbnail.module.css';
import { apiEndPoint } from '../../utils/common';

const Item = (props) => {
  return (
    <>
      <div className={classes.ItemThumbnail} onClick={props.onClick}>
        <img src={`${apiEndPoint}/${props.img}`} alt='' />
        <div className={classes.ItemBar}>
          <h3>{props.name}</h3>
        </div>
      </div>
      <button onClick={props.deleteItem}>delete</button>
    </>
  );
};

export default Item;
