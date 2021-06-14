import React, { useEffect, useState } from 'react';
import { useStore } from '../../../store/store';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Buttons/Button/Button';
import Close from '../../../assets/images/close_icon_white.svg';
import * as requests from '../../../utils/requests';

import classes from './OnboardingModals.module.css';

const Container = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.topPart}>
        {/* <img src={Logo} alt='Trymenu logo' className={classes.logo}/> */}
        <a onClick={() => props.onClose()}>
          <img src={Close} alt='Close' className={classes.XButton} />
        </a>
      </div>

      <div className={classes.centerPart}>{props.children}</div>

      <div className={classes.bottomPart}>
        {props.onNext ? (
          <Button className={classes.nextBTN} onClick={() => props.onNext()}>
            Next
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export const Cuisine = (props) => {
  return (
    <a onClick={() => (props.onPress ? props.onPress() : {})}>
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

const FavCuisinesScene = (props) => {
  const [{ user, cuisines }, dispatch] = useStore();
  const [selectedCuisine, setSelectedCuisine] = useState(user?.cuisines || []);

  useEffect(() => {
    return () => {
      console.log('CUISINE');
      requests
        .updateUser(user._id, { cuisines: selectedCuisine })
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
        {cuisines
          ? cuisines.map((cuisine, idx) => {
              return (
                <Cuisine
                  key={idx}
                  selected={selectedCuisine.includes(cuisine)}
                  label={cuisine}
                  onPress={() => {
                    setSelectedCuisine((x) => {
                      const old = [...x];
                      if (old.includes(cuisine)) {
                        old.splice(old.indexOf(cuisine), 1);
                      } else {
                        old.push(cuisine);
                      }

                      return old;
                    });
                  }}
                />
              );
            })
          : null}
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
