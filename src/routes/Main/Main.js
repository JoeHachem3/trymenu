import React, { useEffect } from 'react';
import RestaurantsContainer from '../../components/RestaurantsContainer/RestaurantsContainer';
import RestaurantForm from '../../components/RestaurantForm/RestaurantForm';
import classes from './Main.module.css';
import { useStore } from '../../store/store';

const Main = (props) => {
  const { token } = useStore()[0];
  useEffect(() => {
    if (!token) props.history.replace('/');
  }, [token, props.history]);
  return (
    <main className={classes.Main}>
      <RestaurantForm />
      <RestaurantsContainer />
    </main>
  );
};

export default Main;
