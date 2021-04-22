import React, { useEffect } from 'react';
import RestaurantsContainer from '../../components/RestaurantsContainer/RestaurantsContainer';
import RestaurantForm from '../../components/RestaurantForm/RestaurantForm';
import classes from './Main.module.css';
import { useStore } from '../../store/store';
import Footer from '../../components/navigation/Footer/Footer';
import Header from '../../components/navigation/Header/Header';
import Container from '../../hoc/Container/Container';
import SectionTitle from '../../components/UI/SectionTitle/SectionTitle';

const Main = (props) => {
  const { token } = useStore()[0];

  useEffect(() => {
    if (!token) props.history.replace('/');
  }, [token, props.history]);

  useEffect(() => {
    if (!token) props.history.replace('/');
    else {
    }
  }, [token, props.history]);

  return (
    <>
    <Header onClick={props.history.goBack}/>
    <Container>
    <main className={classes.Main}>
      <SectionTitle label={"Restaurants"}/>
      <RestaurantsContainer onThumbnailClick={props.history.push} />
    </main>
    </Container>
    <Footer
    actionLabel={"Help us populate trymenu with restauants (Beta version)"}
    actionButtonLabel={"Add Restaurant"}
    modalChildren={(
      <div className={classes.modal}>
        <RestaurantForm goTo={props.history.push} />
      </div>
    )}/>
    </>
  );
};

export default Main;
