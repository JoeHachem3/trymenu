import React from 'react';
import classes from './Header.module.css';
import Container from '../../../hoc/Container/Container';
import Button from '../../UI/Buttons/Button/Button';
import Logo from '../../../assets/images/logo_white.svg';
import { useStore } from '../../../store/store';
import { actions } from '../../../store/configureStore';

const Header = (props) => {
  const [{ user }, dispatch] = useStore();
  console.log(user);
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
                <Button
                  className={classes.logoutbtn}
                  clicked={() => window.open('/account', '_self')}
                >
                  Account
                </Button>
                <Button className={classes.logoutbtn} clicked={logout}>
                  Logout
                </Button>
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
