import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/store';
import RestaurantsContainer from '../../components/RestaurantsContainer/RestaurantsContainer';
import RestaurantForm from '../../components/RestaurantForm/RestaurantForm';
import classes from './Main.module.css';
import Footer from '../../components/navigation/Footer/Footer';
import Header from '../../components/navigation/Header/Header';
import Container from '../../hoc/Container/Container';
import SectionTitle from '../../components/UI/SectionTitle/SectionTitle';
import OnboardingModals, {
  FavCuisines,
} from '../../components/navigation/OnboardingModals/OnboardingModals';

const Main = (props) => {
  const { user } = useStore()[0];
  const [modals, setModals] = useState(null);
  useEffect(() => {
    if (user) {
      if (user.tutorial) {
        setModals(<OnboardingModals />);
        delete user.tutorial;
      } else if (!user.cuisines.length) setModals(<FavCuisines />);
    }
  }, [user]);
  return (
    <>
      <Header
        onLogoClick={() => props.history.push('/')}
        onAccountClick={() => props.history.push('/account')}
      />
      <Container>
        <main className={classes.Main}>
          <SectionTitle label={'Restaurants'} showSearch />
          <RestaurantsContainer onThumbnailClick={props.history.push} />
        </main>
      </Container>
      {modals}
      <Footer
        actionLabel={'Help us populate trymenu with restauants (Beta version)'}
        actionButtonLabel={'Add Restaurant'}
        modalChildren={
          <div className={classes.modal}>
            <RestaurantForm goTo={props.history.push} />
          </div>
        }
      />
    </>
  );
};

export default Main;
