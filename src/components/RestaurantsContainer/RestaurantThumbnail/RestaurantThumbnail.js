import React from 'react';
import classes from './RestaurantThumbnail.module.css';
import { apiEndPoint } from '../../../utils/common';

const RestaurantThumbnail = (props) => {
  return (
    <>
      <div className={classes.RestaurantThumbnail} onClick={props.onClick}>
        <div className={[classes.imagediv]}>
          <img
            className={[classes.img]}
            src={`${apiEndPoint}/${props.img}`}
            alt=''
          />
        </div>
        <div className={classes.RestaurantBar}>
          <div className={classes.title}>{props.name}</div>
          {props.cuisines?.length > 0 ? <div className={classes.subtitle}>{props.cuisines?.join(", ")}</div> : null}
        </div>
      </div>
    </>
  );
};

export default RestaurantThumbnail;
