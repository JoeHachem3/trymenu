import axios from 'axios';
import React, { useEffect } from 'react';
import { actions } from '../../store/configureStore';
import { useStore } from '../../store/store';
import { apiEndPoint } from '../../utils/common';

const Restaurant = (props) => {
  const [{ restaurants, user }, dispatch] = useStore();
  const updatedRestaurants = [];
  let restaurant;
  useEffect(() => {
    if (restaurants) {
      for (let resto of restaurants) {
        if (resto._id === props.match.params.restaurantId) {
          restaurant = resto;
          console.log('found: ' + resto);
        } else {
          updatedRestaurants.push(resto);
        }
      }
      if (restaurant && !restaurant.menu) {
        axios
          .get(`${apiEndPoint}/restaurants/${restaurant._id}`)
          .then((res) => {
            restaurant.menu = res.data.menu;
            // check for usuals and other stuff
            console.log(restaurant);
          })
          .catch((err) => console.log(err));
      }
    }
    return () => dispatch(actions.UPDATE_RESTAURANTS, updatedRestaurants);
  }, [restaurants, props.match.params.restaurantId]);

  const changeRestaurantName = () => {
    if (restaurant) {
      restaurant.name += ' (visited)';
      updatedRestaurants.push(restaurant);
    }
  };

  return <button onClick={changeRestaurantName}>click me</button>;
};
export default Restaurant;
