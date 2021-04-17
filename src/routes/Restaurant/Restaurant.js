import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { actions } from '../../store/configureStore';
import { useStore } from '../../store/store';
import { apiEndPoint } from '../../utils/common';
import ItemForm from '../../components/ItemForm/ItemForm';
import Menu from '../../components/Menu/Menu';
import ItemThumbnail from '../../components/ItemThumbnail/ItemThumbnail';
import Spinner from '../../components/UI/Spinner/Spinner';

const Restaurant = (props) => {
  const [{ restaurants, isLoading, error }, dispatch] = useStore();

  const updatedRestaurants = [];
  let restaurant = useRef(null);
  useEffect(() => {
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
    return () => {
      // updatedRestaurants.push(restaurant.current);
      // dispatch(actions.UPDATE_RESTAURANTS, updatedRestaurants);
    };
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
          (item) => item._id !== itemId,
        );
        restaurant.current.menu = menu;
        dispatch(actions.SHOULD_RENDER);
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
              key={item._id}
              name={item.name}
              img={item.image}
              // onClick={}
              deleteItem={() => deleteItem(item._id)}
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
      <Menu output={output} />
    </>
  );
};
export default Restaurant;
