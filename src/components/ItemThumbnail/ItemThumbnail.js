import React, { useEffect, useState } from 'react';
import classes from './ItemThumbnail.module.css';
import { apiEndPoint } from '../../utils/common';
import Button from '../UI/Buttons/Button/Button';

const ItemThumbnail = (props) => {
  const [rating, setRating] = useState();
  const [prevRating, setPrevRating] = useState();

  let itemState = '.';
  useEffect(() => {
    setRating(props.rating);
    setPrevRating(props.prevRating);
  }, [props]);

  const classNames = [classes.grid];
  let tmpRating = rating;

  // console.log(props.recommended);
  if (props.recommended) {
    classNames.push(classes.recommended);
    itemState = 'Recommended';
  }

  if (prevRating !== null) {
    classNames.push(classes.usual);
    tmpRating = prevRating;
    itemState = 'Usual';
  }
  if (props.isDeleted) {
    classNames.push(classes.deleted);
    itemState = 'Deleted';
  }

  const updateRating = (item, rating) => {
    if (!props.editable) {
      return;
    }
    if (item.prevRating !== null) {
      setPrevRating(rating);
    } else {
      setRating(rating);
    }
    props.setEdited();
    props.updateRating(item, rating);
  };

  const toggleUsual = (item) => {
    if (item.prevRating === null) {
      setPrevRating(rating);
      setRating(5);
    } else {
      setRating(prevRating);
      setPrevRating(null);
    }
    props.setEdited();
    props.toggleUsual(item);
  };

  const UIRating = [
    <div
      key='-1'
      className={classes.removeRating}
      onClick={() =>
        updateRating(
          {
            _id: props.itemId,
            rating: rating,
            prevRating: prevRating,
          },
          0,
        )
      }
    >
      <div></div>
    </div>,
  ];
  for (let i = 0; i < 5; i++) {
    const tmp = Math.floor(tmpRating);
    if (tmp > i) {
      UIRating.push(
        <div
          key={i}
          className={classes.star}
          style={{ background: '#ffc11f' }}
          onClick={() =>
            updateRating(
              {
                _id: props.itemId,
                rating: rating,
                prevRating: prevRating,
              },
              i + 1,
            )
          }
        ></div>,
      );
    } else if (tmp > i) {
      UIRating.push(
        <div
          key={i}
          className={classes.star}
          style={{ background: 'linear-gradient(90deg, #ffc11f 50%, gray 50%)' }}
          onClick={() =>
            updateRating(
              {
                _id: props.itemId,
                rating: rating,
                prevRating: prevRating,
              },
              i + 1,
            )
          }
        ></div>,
      );
    } else {
      UIRating.push(
        <div
          key={i}
          className={classes.star}
          style={{ background: 'gray' }}
          onClick={() =>
            updateRating(
              {
                _id: props.itemId,
                rating: rating,
                prevRating: prevRating,
              },
              i + 1,
            )
          }
        ></div>,
      );
    }
  }

  return (
    <div className={classNames.join(' ')}>

      <div className={classes.ItemThumbnail}>
        <div className={classes.imagediv}>
          <img src={`${apiEndPoint}/${props.img}`} alt='' />
        </div>

        <div className={classes.ItemState}>
          <h4>{itemState}</h4>
        </div>

        <div className={classes.ItemBar}>
          <h3>{props.name}</h3>
          {props.price ? <h4>{props.price} LBP</h4> : null}
          <div className={classes.UIRating}>{UIRating}</div>
        </div>

      </div>

      <div className={classes.btndiv}>
        {props.toggleUsual ? (
          <Button
            className={classes.smallBtn}
            onClick={() =>
              toggleUsual({
                _id: props.itemId,
                rating: rating,
                prevRating: prevRating,
              })
            }
          >
            {prevRating === null ? 'Usual' : 'Unusual'}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default ItemThumbnail;
