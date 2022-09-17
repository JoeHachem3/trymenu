/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classes from './Header.module.css';
import Container from '../../../hoc/Container/Container';
import Button from '../../UI/Buttons/Button/Button';
import Logo from '../../../assets/images/logo_white.svg';
import { useStore } from '../../../store/store';
import { actions } from '../../../store/configureStore';

const Header = (props) => {
  const [{ user }, dispatch] = useStore();
  const logout = () => {
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('tokenId');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    dispatch(actions.LOGOUT);
  };

  return (
    <>
      <header className={classes.Header}>
        <div className={classes.Parent}>
          <Container>
            <div className={classes.row}>
              <a onClick={props.onLogoClick} className={classes.pointer}>
                <img src={Logo} alt='Trymenu logo' className={classes.logo} />
              </a>
              <div className={classes.rightContainer}>
                <Button className={classes.logoutbtn} onClick={logout}>
                  Logout
                </Button>
                <div
                  className={classes.profileContainer}
                  onClick={props.onAccountClick}>
                  <div className={classes.profileLabel}>{user?.username}</div>
                  {/* <div className={classes.profilePic}></div> */}
                  <div className={classes.profilePic}>
                    <img
                      className={classes.pic}
                      src='https://i1.wp.com/researchictafrica.net/wp/wp-content/uploads/2016/10/default-profile-pic.jpg?fit=300%2C300&ssl=1'
                      alt='profile pic'
                    />
                  </div>
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
