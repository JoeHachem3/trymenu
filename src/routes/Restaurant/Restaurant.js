import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { actions } from '../../store/configureStore';
import { useStore } from '../../store/store';
import { apiEndPoint } from '../../utils/common';
import ItemForm from '../../components/ItemForm/ItemForm';
import Menu from '../../components/Menu/Menu';
import ItemThumbnail from '../../components/ItemThumbnail/ItemThumbnail';
import Spinner from '../../components/UI/Spinner/Spinner';

const Restaurant = (props) => {
  const [{ restaurants, isLoading, error, token }, dispatch] = useStore();

  const [shouldRender, setShouldRender] = useState(0);

  const updatedRestaurants = [];
  const restaurant = useRef(null);
  const ratedItems = useRef([]);
  useEffect(() => {
    if (!token) {
      props.history.push('/');
      return;
    }
    dispatch(actions.IS_LOADING);
    if (restaurants) {
      for (let resto of restaurants) {
        if (resto._id === props.match.params.restaurantId) {
          restaurant.current = resto;
        } else {
          updatedRestaurants.push(resto);
        }
      }
      if (restaurant.current && !restaurant.current.menu) {
        axios
          .get(`${apiEndPoint}/items/${restaurant.current._id}`, {
            headers: {
              Authorization: 'bearer ' + localStorage.getItem('tokenId'),
            },
          })
          .then((res) => {
            console.log(res);
            res.data.items.forEach((item) => {
              if (item.rating !== 0) {
                ratedItems.current.push({
                  _id: item.item._id,
                  rating: item.rating,
                  prevRating: item.prevRating,
                });
              }
            });
            restaurant.current.menu = res.data.items;
            dispatch(actions.IS_NOT_LOADING);
          })
          .catch((err) => {
            console.log(err);
            dispatch(actions.IS_ERROR, err);
          });
      } else {
        dispatch(actions.IS_NOT_LOADING);
      }
    }
  }, [restaurants, props.match.params.restaurantId, dispatch]);

  const deleteItem = (itemId) => {
    axios
      .delete(`${apiEndPoint}/items/${itemId}`, {
        headers: {
          Authorization: 'bearer ' + localStorage.getItem('tokenId'),
        },
      })
      .then((res) => {
        const menu = restaurant.current.menu.filter(
          (item) => item.item._id !== itemId,
        );
        restaurant.current.menu = menu;
        setShouldRender(shouldRender + 1);
      })
      .catch((err) => console.log(err));
  };

  const toggleUsual = (item) => {
    if (item.prevRating === null) {
      item.prevRating = item.rating;
      item.rating = 5;
      ratedItems.current.push({
        _id: item.item._id,
        rating: item.rating,
        prevRating: item.prevRating,
      });
    } else {
      item.rating = item.prevRating;
      item.prevRating = null;
      ratedItems.current = ratedItems.current.filter(
        (i) => i._id !== item.item._id,
      );
    }
    setShouldRender(shouldRender + 1);
  };

  const updateRating = (item, rating) => {
    for (let i = 0; i < ratedItems.current.length; i++) {
      if (ratedItems.current[i]._id === item._id) {
        if (ratedItems.current[i].prevRating !== null) {
          ratedItems.current[i].prevRating = rating;
        } else {
          ratedItems.current[i].rating = rating;
        }
        return;
      }
    }
    ratedItems.current.push({
      _id: item._id,
      rating: rating,
      prevRating: null,
    });
  };

  const updatesFinished = () => {
    axios
      .patch(
        `${apiEndPoint}/users/rating`,
        {
          _id: props.match.params.restaurantId,
          ratedItems: ratedItems.current,
        },
        {
          headers: {
            Authorization: 'bearer ' + localStorage.getItem('tokenId'),
          },
        },
      )
      .then((res) => {
        res.data.restaurant.ratedItems.forEach((ratedItem) => {
          for (let i = 0; i < restaurant.current.menu.length; i++) {
            if (
              ratedItem._id.toString() === restaurant.current.menu[i].item._id
            ) {
              restaurant.current.menu[i].rating = ratedItem.rating;
              restaurant.current.menu[i].prevRating = ratedItem.prevRating;
              break;
            }
          }
        });
        updatedRestaurants.push(restaurant.current);
        dispatch(actions.UPDATE_USER_RESTAURANTS, res.data.restaurants);
        dispatch(actions.UPDATE_RESTAURANTS, updatedRestaurants);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  let output = <Spinner />;

  if (!isLoading && restaurant.current) {
    if (!error) {
      if (restaurant.current.menu.length === 0) {
        output = (
          <h1>
            {
              'still figuring out a way to save the edited menu for later entries to the same restaurant'
            }
          </h1>
        );
      } else {
        output = restaurant.current.menu.map((item) => {
          return (
            <ItemThumbnail
              key={item.item._id}
              itemId={item.item._id}
              name={item.item.name}
              img={item.item.image}
              rating={item.rating}
              prevRating={item.prevRating}
              toggleUsual={() => toggleUsual(item)}
              deleteItem={() => deleteItem(item.item._id)}
              updateRating={updateRating}
            />
          );
        });
      }
    } else {
      output = <h1>{'ERROR'}</h1>;
    }
  }
  return (
    <>
      <ItemForm restaurantId={props.match.params.restaurantId} />
      <Menu output={output} updatesFinished={updatesFinished} />
    </>
  );
};
export default Restaurant;
