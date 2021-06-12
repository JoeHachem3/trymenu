import React, { useState } from 'react';
import classes from './Footer.module.css';
import Container from '../../../hoc/Container/Container';
import Button from '../../UI/Buttons/Button/Button';
import SocialButton from '../../UI/Buttons/SocialButton/SocialButton';
import { NavLink } from 'react-router-dom';
import Modal from '../../UI/Modal/Modal';
import OnboardingModals from '../OnboardingModals/OnboardingModals'

const Footer = (props) => {
    const [showModal, setShowModal] = useState(false);
    const t = (p) => p;
        return (
            <>
            <footer className={classes.Footer}>
                {/* <div className={classes.TopShape} /> */}
                <div className={classes.Parent}>
                    <Container>
                        <section className={classes.FooterMain}>
        
                            <div className={classes.FooterMainItem}>
                            <h2>Trymenu</h2>
                            <ul>
                                <li>
                                    <NavLink to={'/'} exact>{t("Home")}</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/'}  exact>{t("Press")}</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/'}  exact>{t("Contact us")}</NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/'}  exact>{t("FAQ")}</NavLink>
                                </li>
                            </ul>
                            </div>
        
                            <div className={classes.FooterMainItem}>
                            <h2>{t("Website")}</h2>
                            <ul>
                                <li><NavLink to={'/'}  exact>{t("Terms & Conditions")}</NavLink></li>
                                <li><NavLink to={'/'}  exact>{t("Privacy Policy")}</NavLink></li>
                                <li><NavLink to={'/'}  exact>{t("Sitemap")}</NavLink></li>
                            </ul>
                            </div>
        
                            <div className={classes.FooterMainItem}>
                            {/* <p>{t(props.actionLabel)}</p>
                            <Button clicked={() => setShowModal(true)}>{t(props.actionButtonLabel)}</Button> */}
                            <br /><br /><br />
                            <h2>{t("Social Media")}</h2>
                            <div className={classes.FooterSocialList}>
                                <SocialButton type="twitter"/>
                                <SocialButton type="facebook"/>
                                <SocialButton type="instagram"/>
                                <SocialButton type="linkedin"/>
                            </div>
                            </div>
        
                        </section>
        
                        <section className={classes.FooterLegal}>
                            {t("Trymenu copyright ©")} {new Date().getFullYear()}. {t("All rights are reserved")}
                        </section>
        
                    </Container>
                </div>
            </footer>
            {showModal ? (
                <Modal
                    modalClosed={() => {
                    setShowModal(false);
                    }}
                >
                    {props.modalChildren}
                </Modal>
            ) : null}
            <OnboardingModals />
            </>
        );
}


export default Footer;