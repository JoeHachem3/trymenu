import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndPoint } from '../../utils/common';
import RestaurantThumbnail from '../../components/RestaurantThumbnail/RestaurantThumbnail';
import classes from './Main.module.css';

const Main = () => {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    axios
      .get(apiEndPoint + '/restaurants')
      .then((res) => {
        const tmp = res.data.response.restaurants;
        setRestaurants(tmp);
      })
      .catch((err) => console.log(err));
  }, []);

  let restaus = null;

  if (restaurants) {
    restaus = restaurants.map((restaurant) => {
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

export default Main;
