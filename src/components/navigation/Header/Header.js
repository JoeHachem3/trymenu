import React, { useState } from 'react';
import classes from './Header.module.css';
import Container from '../../../hoc/Container/Container';
import Button from '../../UI/Buttons/Button/Button';
import SocialButton from '../../UI/Buttons/SocialButton/SocialButton';
import { NavLink } from 'react-router-dom';
import Modal from '../../UI/Modal/Modal';
import Logo from '../../../assets/images/logo_white.svg';
import { useStore } from '../../../store/store';
import { actions } from '../../../store/configureStore';

const Header = (props) => {
  const [{ user }, dispatch] = useStore();

  const logout = () => {
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('tokenId');
    localStorage.removeItem('userId');
    dispatch(actions.LOGOUT);
  };

  return (
    <>
      <header className={classes.Header}>
        <div className={classes.Parent}>
          <Container>
            <div className={classes.row}>
              <a onClick={props.onClick} className={classes.pointer}>
                <img src={Logo} alt='Trymenu logo' className={classes.logo} />
              </a>
              <div className={classes.rightContainer}>
                <Button clicked={logout}>Logout</Button>
                <div className={classes.profileContainer}>
                  <div className={classes.profileLabel}>{user?.username}</div>
                  <div className={classes.profilePic}></div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
};

export default Header;
