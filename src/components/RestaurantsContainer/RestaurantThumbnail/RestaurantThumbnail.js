import React from 'react';
import classes from './RestaurantThumbnail.module.css';
import { apiEndPoint } from '../../../utils/common';

const RestaurantThumbnail = (props) => {
  return (
    <>
      <div className={classes.RestaurantThumbnail} onClick={props.onClick}>
        <img src={`${apiEndPoint}/${props.img}`} alt='' />
        <div className={classes.RestaurantBar}>
          <h3>{props.name}</h3>
        </div>
      </div>
      <button onClick={props.deleteRestaurant}>delete</button>
    </>
  );
};

export default RestaurantThumbnail;
