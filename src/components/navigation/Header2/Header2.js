import React from 'react';
import classes from './Header.module.css';
import Container from '../../../hoc/Container/Container';
import Button from '../../UI/Buttons/Button/Button';
import Logo from '../../../assets/images/logo_white.svg';
import { useStore } from '../../../store/store';
import { actions } from '../../../store/configureStore';

const Header2 = (props) => {
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
          {props.children}
        </div>
      </header>
    </>
  );
};

export default Header2;
