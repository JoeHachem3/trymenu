import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/store';
import Footer from '../../components/navigation/Footer/Footer';
import Header from '../../components/navigation/Header/Header';
import Container from '../../hoc/Container/Container';
import SectionTitle from '../../components/UI/SectionTitle/SectionTitle';
import Button from '../../components/UI/Buttons/Button/Button';
import { Cuisine } from '../../components/navigation/OnboardingModals/OnboardingModals';
import * as requests from '../../utils/requests';
import classes from './Account.module.css';

const Account = (props) => {
  const [{ user, cuisines }] = useStore();

  const [selectedCuisine, setSelectedCuisine] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setSelectedCuisine(user.cuisines);
      setUsername(user.username);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
  }, [user]);

  const inputHandler = (event, cb) => {
    cb(event.target.value);
  };

  const save = () => {
    console.log('save');
    requests
      .updateUser(user._id, {
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        cuisines: selectedCuisine,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header
        onLogoClick={() => props.history.push('/')}
        onAccountClick={() => props.history.push('/account')}
      />
      <Container>
        <main className={classes.Main}>
          <SectionTitle label={'Account Settings'} />
          <div className={classes.Container}>
            <div className={classes.rightContainer}>
              <label className={classes.InputLabel}>
                Username
                <br />
                <input
                  onChange={(event) => inputHandler(event, setUsername)}
                  placeholder='Username'
                  value={username}
                  className={classes.InputInput}
                />
              </label>
              <div className={classes.col2}>
                <label className={classes.InputLabel}>
                  First Name
                  <br />
                  <input
                    onChange={(event) => inputHandler(event, setFirstName)}
                    placeholder='First Name'
                    value={firstName}
                    className={classes.InputInput}
                  />
                </label>
                <label className={classes.InputLabel}>
                  Last Name
                  <br />
                  <input
                    onChange={(event) => inputHandler(event, setLastName)}
                    placeholder='Last Name'
                    value={lastName}
                    className={classes.InputInput}
                  />
                </label>
              </div>
              <label className={classes.InputLabel}>
                Email
                <br />
                <input
                  onChange={(event) => inputHandler(event, setEmail)}
                  placeholder='Email'
                  value={email}
                  className={classes.InputInput}
                />
              </label>
              <label className={classes.InputLabel}>
                Favorite Cuisines
                <br />
                <div className={classes.onboardingContainerContent}>
                  {cuisines?.map((cuisine, idx) => (
                    <Cuisine
                      key={idx}
                      dark
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
                <Button className={classes.btn2} onClick={save}>
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
