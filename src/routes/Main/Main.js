import React from 'react';
import RestaurantsContainer from '../../components/RestaurantsContainer/RestaurantsContainer';
import RestaurantForm from '../../components/RestaurantForm/RestaurantForm';
import classes from './Main.module.css';

const Main = () => (
  <main className={classes.Main}>
    <RestaurantForm />
    <RestaurantsContainer />
  </main>
);

export default Main;
