import React, { useEffect } from 'react';
import axios from 'axios';
import { apiEndPoint } from '../../utils/common';
import RestaurantThumbnail from './RestaurantThumbnail/RestaurantThumbnail';
import { useStore } from '../../store/store';
import classes from './RestaurantsContainer.module.css';

const RestaurantsContainer = () => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    axios
      .get(apiEndPoint + '/restaurants')
      .then((res) => {
        console.log(res);
        const restaurants = res.data.response.restaurants;
        dispatch('UPDATE_RESTAURANTS', restaurants);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  let restaus = null;

  if (state.restaurants) {
    restaus = state.restaurants.map((restaurant) => {
      return (
        <RestaurantThumbnail
          key={restaurant.restaurant._id}
          img={restaurant.restaurant.logo}
          name={restaurant.restaurant.name}
        />
      );
    });
  }
  return <section className={classes.Restaurants}>{restaus}</section>;
};

export default RestaurantsContainer;
