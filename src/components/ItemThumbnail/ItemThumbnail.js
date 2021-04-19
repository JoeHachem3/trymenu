import React, { useEffect, useState } from 'react';
import classes from './ItemThumbnail.module.css';
import { apiEndPoint } from '../../utils/common';
import Button from '../UI/Button/Button';

const ItemThumbnail = (props) => {
  const [rating, setRating] = useState();
  const [prevRating, setPrevRating] = useState();

  useEffect(() => {
    setRating(props.rating);
    setPrevRating(props.prevRating);
  }, [props]);

  const classNames = [classes.ItemThumbnail];
  let tmpRating = rating;

  if (prevRating !== null) {
    classNames.push(classes.usual);
    tmpRating = prevRating;
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
    props.toggleUsual(item);
  };

  const UIRating = [];
  for (let i = 0; i < 5; i++) {
    const tmp = Math.floor(tmpRating);
    if (tmp > i) {
      UIRating.push(
        <div
          key={i}
          className={classes.circle}
          style={{ background: 'gold' }}
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
          className={classes.circle}
          style={{ background: 'linear-gradient(90deg, gold 50%, gray 50%)' }}
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
          className={classes.circle}
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
    <div className={classes.grid}>
      <div className={classNames.join(' ')}>
        <img src={`${apiEndPoint}/${props.img}`} alt='' />
        <div className={classes.ItemBar}>
          <h3>{props.name}</h3>
          <div className={classes.UIRating}>{UIRating}</div>
        </div>
      </div>

      {props.toggleUsual ? (
        <Button
          clicked={() =>
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
      {props.deleteItem ? (
        <Button clicked={props.deleteItem}>{'Delete'}</Button>
      ) : null}
    </div>
  );
};

export default ItemThumbnail;
