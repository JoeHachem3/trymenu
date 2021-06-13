import React, { useState } from 'react';
import { useStore } from '../../../store/store';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Buttons/Button/Button';
import Logo from '../../../assets/images/logo_white.svg';
import Close from '../../../assets/images/close_icon_white.svg';

import classes from './OnboardingModals.module.css';

const Container = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.topPart}>
        {/* <img src={Logo} alt='Trymenu logo' className={classes.logo}/> */}
        <a onClick={() => props.onClose()}>
          <img src={Close} alt='Close button' className={classes.XButton} />
        </a>
      </div>

      <div className={classes.centerPart}>{props.children}</div>

      <div className={classes.bottomPart}>
        <Button className={classes.nextBTN} clicked={() => props.onNext()}>
          Next
        </Button>
      </div>
    </div>
  );
};

export const Cusine = (props) => {
  return (
    <a onClick={() => (props.onPress ? props.onPress() : {})}>
      <div
        className={
          props.selected
            ? props.dark
              ? classes.cusineContainerSelectedDark
              : classes.cusineContainerSelected
            : props.dark
            ? classes.cusineContainerDark
            : classes.cusineContainer
        }
      >
        <span className={classes.cusineLabel}>{props.label}</span>
      </div>
    </a>
  );
};

export const cusines = [
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

const FavCusinesScene = (props) => {
  const [{ user }, dispatch] = useStore();
  const [selectedCuisine, setSelectedCuisine] = useState([]);
  return (
    <div className={classes.onboardingContainer}>
      <span className={classes.onboardingContainerTitle}>
        Hello, {user?.username}!
      </span>
      <span className={classes.onboardingContainerSub}>
        {' '}
        In order to make better reommendations, select your favortie cuisines
      </span>
      <div className={classes.onboardingContainerContent}>
        {cusines.map((cuisine, idx) => (
          <Cusine
            selected={selectedCuisine.includes(idx)}
            label={cuisine}
            onPress={() => {
              setSelectedCuisine((x) => {
                const old = [...x];
                if (old.includes(idx)) {
                  old.splice(old.indexOf(idx), 1);
                } else {
                  old.push(idx);
                }

                return old;
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

const OnboardingModals = (props) => {
  const [showModal, setShowModal] = useState(true);
  const [onBoard, setOnboard] = useState(0);

  const renderOnboard = () => {
    switch (onBoard) {
      case 0:
        return <FavCusinesScene />;
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
