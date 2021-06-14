import React, { useEffect } from 'react';
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
    restaurants.forEach((restaurant) => {
      if (restaurant.byCuisine) {
        byCuisine.push(
          <RestaurantThumbnail
            key={restaurant._id}
            img={restaurant.logo}
            name={restaurant.name}
            cusine={restaurant.cusines?.join(", ")}
            byCuisine={true}
            onClick={() =>
              props.onThumbnailClick('/restaurants/' + restaurant._id)
            }
          />,
        );
      } else {
        restaus.push(
          <RestaurantThumbnail
            key={restaurant._id}
            img={restaurant.logo}
            name={restaurant.name}
            cusine={restaurant.cusines?.join(", ")}
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
      {byCuisine?.length > 0 ? (
        <>
          <h3 className={classes.h3}>Recommended by cuisine</h3>
          <div className={classes.Restaurants1}>{byCuisine}</div>
        </>
      ) : null}
      {restaus?.length > 0 ? (
        <>
          <h3 className={classes.h3}>To spice things up</h3>
          <div className={classes.Restaurants2}>{restaus}</div>
        </>
      ) : null}
      {/* <ItemRecommender /> */}
    </Container>
  );
};

export default RestaurantsContainer;
