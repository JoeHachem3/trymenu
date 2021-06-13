import React, { useEffect, useState } from 'react';
import { useStore } from '../../../store/store';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Buttons/Button/Button';
import Logo from '../../../assets/images/logo_white.svg';
import Close from '../../../assets/images/close_icon_white.svg';
import * as requests from '../../../utils/requests';
import { apiEndPoint } from '../../../utils/common';

import classes from './OnboardingModals.module.css';

const Container = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.topPart}>
        {/* <img src={Logo} alt='Trymenu logo' className={classes.logo}/> */}
        <a href onClick={() => props.onClose()}>
          <img src={Close} alt='Close' className={classes.XButton} />
        </a>
      </div>

      <div className={classes.centerPart}>{props.children}</div>

      <div className={classes.bottomPart}>
        {props.onNext ? (
          <Button className={classes.nextBTN} clicked={() => props.onNext()}>
            Next
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export const Cuisine = (props) => {
  return (
    <a href onClick={() => (props.onPress ? props.onPress() : {})}>
      <div
        className={
          props.selected
            ? props.dark
              ? classes.cuisineContainerSelectedDark
              : classes.cuisineContainerSelected
            : props.dark
            ? classes.cuisineContainerDark
            : classes.cuisineContainer
        }
      >
        <span className={classes.cuisineLabel}>{props.label}</span>
      </div>
    </a>
  );
};

export const cuisines = [
  'Afghan',
  'African',
  'Albanian',
  'Algerian',
  'Alsatian',
  'American',
  'Armenian',
  'Argentine',
  'Asian',
  'Australian',
  'Austrian',
  'Auvergne',
  'Bagels',
  'Bakery',
  'Bangladeshi',
  'Barbecue',
  'Belgian',
  'Bistro',
  'Brazilian',
  'British',
  'Burgers',
  'Burgundy',
  'Burmese',
  'Cafe',
  'Cajun',
  'Californian',
  'Calzones',
  'Cambodian',
  'Caribbean',
  'Cheesesteaks',
  'Chicken',
  'Chilean',
  'Chinese',
  'Chowder',
  'Coffee',
  'Colombian',
  'Contemporary',
  'Continental',
  'Corsica',
  'Creole',
  'Crepes',
  'Cuban',
  'Cuban',
  'Czech',
  'Deli',
  'Dim Sum',
  'Diner',
  'Dominican',
  'Donuts',
  'Dutch',
  'Eastern European',
  'Eclectic',
  'Egyptian',
  'English',
  'Ethiopian',
  'Ecuadorean',
  'European',
  'Fast Food',
  'Filipino',
  'Fish and Chips',
  'Fondue',
  'French',
  'Frozen Yogurt',
  'Fusion',
  'Gastropub',
  'German',
  'Greek',
  'Grill',
  'Gyros',
  'Haitian',
  'Halal',
  'Hawaiian',
  'Healthy',
  'Hot Dogs',
  'Ice Cream',
  'Indian',
  'Indonesian',
  'International',
  'Irish',
  'Israeli',
  'Italian',
  'Jamaican',
  'Japanese',
  'Juices',
  'Korean',
  'Korean Barbeque',
  'Kosher',
  'Latin',
  'Latin American',
  'Lebanese',
  'Lyonnais',
  'Malaysian',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Mongolian',
  'Moroccan',
  'Nepalese',
  'Noodle Bar',
  'Norwegian',
  'Organic',
  'Oysters',
  'Pacific Rim',
  'Pakistani',
  'Pan Asian',
  'Pasta',
  'Pastries',
  'Persian',
  'Peruvian',
  'Pho',
  'Pizza',
  'Polish',
  'Polynesian',
  'Portuguese',
  'Provençal',
  'Pub Food',
  'Puerto Rican',
  'Raw',
  'Ribs',
  'Russian',
  'Salad',
  'Salvadoran',
  'Sandwiches',
  'Savoy',
  'Scandinavian',
  'Seafood',
  'Senegalese',
  'Singaporean',
  'Smoothies',
  'Soul Food',
  'Soup',
  'South American',
  'South African',
  'South Pacific',
  'Southern',
  'Southwestern',
  'Spanish',
  'Steak',
  'Steakhouse',
  'Subs',
  'Sushi',
  'Taiwanese',
  'Tapas',
  'Tea',
  'Tex Mex',
  'Thai',
  'Tibetan',
  'Traditional',
  'Tunisian',
  'Turkish',
  'Ukrainian',
  'Vegan',
  'Vegetarian',
  'Venezuelan',
  'Vietnamese',
  'Wings',
  'Wraps',
];

const FavCuisinesScene = (props) => {
  const [{ user }, dispatch] = useStore();
  const [selectedCuisine, setSelectedCuisine] = useState([]);

  useEffect(() => {
    return () => {
      requests
        .updateUser(user._id, selectedCuisine)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    };
  });

  return (
    <div className={classes.onboardingContainer}>
      <span className={classes.onboardingContainerTitle}>
        Hello, {user?.username}!
      </span>
      <span className={classes.onboardingContainerSub}>
        {' '}
        In order to make better recommendations, select your favorite cuisines
      </span>
      <div className={classes.onboardingContainerContent}>
        {cuisines.map((cuisine, idx) => {
          const lowercase = cuisine.toLowerCase();
          return (
            <Cuisine
              key={idx}
              selected={selectedCuisine.includes(lowercase)}
              label={cuisine}
              onPress={() => {
                setSelectedCuisine((x) => {
                  const old = [...x];
                  if (old.includes(lowercase)) {
                    old.splice(old.indexOf(lowercase), 1);
                  } else {
                    old.push(lowercase);
                  }

                  return old;
                });
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const FavCuisines = () => {
  const [showModal, setShowModal] = useState(true);
  return (
    <>
      {showModal ? (
        <Modal
          closeModal={() => {
            setShowModal(false);
          }}
        >
          <Container onClose={() => setShowModal(false)}>
            <FavCuisinesScene />
          </Container>
        </Modal>
      ) : null}
    </>
  );
};

const OnboardingModals = (props) => {
  const [showModal, setShowModal] = useState(true);
  const [onBoard, setOnboard] = useState(0);

  const renderOnboard = () => {
    switch (onBoard) {
      case 0:
        return <FavCuisinesScene />;
      case 1:
        return <div className={classes.onboardingImageContainer1} />;
      case 2:
        return <div className={classes.onboardingImageContainer2} />;
      case 3:
        return <div className={classes.onboardingImageContainer3} />;
      default:
        setShowModal(false);
        return null;
    }
  };

  return (
    <>
      {showModal ? (
        <Modal
          closeModal={() => {
            setShowModal(false);
          }}
        >
          <Container
            onClose={() => setShowModal(false)}
            onNext={() => setOnboard((x) => x + 1)}
          >
            {renderOnboard()}
          </Container>
        </Modal>
      ) : null}
    </>
  );
};

export default OnboardingModals;
