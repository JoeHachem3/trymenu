import React from 'react';
import axios from 'axios';
import { apiEndPoint } from '../../utils/common';
import RestaurantThumbnail from './RestaurantThumbnail/RestaurantThumbnail';
import ItemRecommender from '../ItemRecommender/ItemRecommender';
import Button from '../UI/Button/Button';
import { useStore } from '../../store/store';
import { actions } from '../../store/configureStore';
import classes from './RestaurantsContainer.module.css';

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
  return (
    <section className={classes.Restaurants}>
      {restaus}
      {/* <div className={classes.logoutBtn}>
        <Button clicked={logout}>logout</Button>
      </div> */}
      <ItemRecommender />
    </section>
  );
};

export default RestaurantsContainer;
