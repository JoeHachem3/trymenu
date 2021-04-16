import React from 'react';
import axios from 'axios';
import { apiEndPoint } from '../../utils/common';
import RestaurantThumbnail from './RestaurantThumbnail/RestaurantThumbnail';
import { useStore } from '../../store/store';
import classes from './RestaurantsContainer.module.css';
import { actions } from '../../store/configureStore';

const RestaurantsContainer = (props) => {
  const [{ restaurants }, dispatch] = useStore();

  const logout = () => {
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('tokenId');
    localStorage.removeItem('userId');
    dispatch(actions.LOGOUT);
  };

  const deleteRestaurant = (restaurantId) => {
    axios
      .delete(`${apiEndPoint}/restaurants/${restaurantId}`, {
        headers: {
          Authorization: 'bearer ' + localStorage.getItem('tokenId'),
        },
      })
      .then((res) => {
        const updatedRestaurants = restaurants.filter(
          (resto) => resto._id !== restaurantId,
        );
        dispatch(actions.UPDATE_RESTAURANTS, updatedRestaurants);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  let restaus = null;

  if (restaurants) {
    if (restaurants.length === 0) {
      restaus = (
        <h1>
          Make your own restaurants Jul... and fix the category part of the form
          please (RestaurantForm.js:82 not showing).<br></br>
          <br></br>
          Check the console too!<br></br>
          Okay it was 14 renders for RestaurantForm, with the use of React.memo
          now it's 6... is this normal?
        </h1>
      );
    } else {
      restaus = restaurants.map((restaurant) => {
        return (
          <RestaurantThumbnail
            key={restaurant._id}
            img={restaurant.logo}
            name={restaurant.name}
            deleteRestaurant={() => deleteRestaurant(restaurant._id)}
            onClick={() =>
              props.onThumbnailClick('/restaurants/' + restaurant._id)
            }
          />
        );
      });
    }
  }
  return (
    <section className={classes.Restaurants}>
      {restaus}
      <button onClick={logout}>logout</button>
    </section>
  );
};

export default RestaurantsContainer;
