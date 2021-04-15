import React, { useEffect } from 'react';
import axios from 'axios';
import { apiEndPoint } from '../../utils/common';
import RestaurantThumbnail from './RestaurantThumbnail/RestaurantThumbnail';
import { useStore } from '../../store/store';
import classes from './RestaurantsContainer.module.css';
import { actions } from '../../store/configureStore';

const RestaurantsContainer = () => {
  const [{ restaurants }, dispatch] = useStore();

  useEffect(() => {
    axios
      .get(apiEndPoint + '/restaurants')
      .then((res) => {
        console.log(res);
        const restaurants = res.data.response.restaurants;
        dispatch(actions.UPDATE_RESTAURANTS, restaurants);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('tokenId');
    localStorage.removeItem('userId');
    dispatch(actions.LOGOUT);
  };

  let restaus = null;

  if (restaurants) {
    restaus = restaurants.map((restaurant) => {
      return (
        <RestaurantThumbnail
          key={restaurant._id}
          img={restaurant.logo}
          name={restaurant.name}
        />
      );
    });
  }
  return (
    <section className={classes.Restaurants}>
      {restaus}
      <button onClick={logout}>logout</button>
    </section>
  );
};

export default RestaurantsContainer;
