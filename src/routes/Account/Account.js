import React, { useEffect, useState } from 'react';
import classes from './Account.module.css';
import { useStore } from '../../store/store';
import Footer from '../../components/navigation/Footer/Footer';
import Header from '../../components/navigation/Header/Header';
import Container from '../../hoc/Container/Container';
import SectionTitle from '../../components/UI/SectionTitle/SectionTitle';
import Button from '../../components/UI/Buttons/Button/Button';
import Input from '../../components/UI/Input/Input';
import {
  Cuisine,
  cuisines,
} from '../../components/navigation/OnboardingModals/OnboardingModals';

const Account = (props) => {
  const { token } = useStore()[0];
  const [{ user }, dispatch] = useStore();

  const [selectedCuisine, setSelectedCuisine] = useState([]);

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
      <Header onClick={props.history.goBack} />
      <Container>
        <main className={classes.Main}>
          <SectionTitle label={'Account Settings'} />
          <div className={classes.Container}>
            <div className={classes.rightContainer}>
              <label className={classes.InputLabel}>
                Username
                <br />
                <input
                  placeholder='Username'
                  value={user?.username}
                  className={classes.InputInput}
                />
              </label>
              <div className={classes.col2}>
                <label className={classes.InputLabel}>
                  First Name
                  <br />
                  <input
                    placeholder='First Name'
                    value={user?.first_name}
                    className={classes.InputInput}
                  />
                </label>
                <label className={classes.InputLabel}>
                  Last Name
                  <br />
                  <input
                    placeholder='Last Name'
                    value={user?.last_name}
                    className={classes.InputInput}
                  />
                </label>
              </div>
              <label className={classes.InputLabel}>
                Email
                <br />
                <input
                  placeholder='Email'
                  value={user?.email}
                  className={classes.InputInput}
                />
              </label>
              <label className={classes.InputLabel}>
                Favorite Cuisines
                <br />
                <div className={classes.onboardingContainerContent}>
                  {cuisines.map((cuisine, idx) => (
                    <Cuisine
                      dark
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
              </label>
            </div>

            <div className={classes.leftContainer}>
              <div className={classes.ProfilePic}>
                <img
                  className={classes.pic}
                  src='https://i1.wp.com/researchictafrica.net/wp/wp-content/uploads/2016/10/default-profile-pic.jpg?fit=300%2C300&ssl=1'
                  alt='profile pic'
                />
              </div>
              <div>
                <Button className={classes.btn} onClick={() => {}}>
                  Change Profile
                </Button>
              </div>

              <div className={classes.btn2c}>
                <Button className={classes.btn2} onClick={() => {}}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default Account;
