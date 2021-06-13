import React from 'react';
import RestaurantThumbnail from './RestaurantThumbnail/RestaurantThumbnail';
// import ItemRecommender from '../ItemRecommender/ItemRecommender';
import { useStore } from '../../store/store';
import Container from '../../hoc/Container/Container';
import classes from './RestaurantsContainer.module.css';

const RestaurantsContainer = (props) => {
  const { restaurants } = useStore()[0];

  const byCuisine = [];
  const restaus = [];

  if (restaurants) {
    console.log(restaurants.length);
    restaurants.forEach((restaurant) => {
      if (restaurant.byCuisine) {
        byCuisine.push(
          <RestaurantThumbnail
            key={restaurant._id}
            img={restaurant.logo}
            name={restaurant.name}
            byCuisine={true}
            onClick={() =>
              props.onThumbnailClick('/restaurants/' + restaurant._id)
            }
          />,
        );
      } else {
        console.log(restaurant);
        restaus.push(
          <RestaurantThumbnail
            key={restaurant._id}
            img={restaurant.logo}
            name={restaurant.name}
            onClick={() =>
              props.onThumbnailClick('/restaurants/' + restaurant._id)
            }
          />,
        );
      }
    });
  }
  return (
    <Container>
      <h3 className={classes.h3}>Recommended by cuisine</h3>
      <div className={classes.Restaurants}>{byCuisine}</div>
      <h3 className={classes.h3}>To spice things up</h3>
      <div className={classes.Restaurants}>{restaus}</div>
      {/* <ItemRecommender /> */}
    </Container>
  );
};

export default RestaurantsContainer;
