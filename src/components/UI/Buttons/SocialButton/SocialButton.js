import React from 'react';
import classes from './SocialButton.module.css';
import facebookIcon from '../../../../assets/images/facebook_icon.svg';
import twitterIcon from '../../../../assets/images/twitter_icon.svg';
import instagramIcon from '../../../../assets/images/instagram_icon.svg';
import linkedinIcon from '../../../../assets/images/linkedin_icon.svg';

const SocialButton = (props) => {
    let img = null;
    let url = null;

    switch (props.type) {
        case 'twitter':
            img = twitterIcon;
            url = 'https://twitter.com/';
            break;
        case 'instagram':
            img = instagramIcon;
            url = 'https://www.instagram.com/';
            break;
        case 'facebook':
            img = facebookIcon;
            url = 'https://www.facebook.com/';
            break;
        case 'linkedin':
            img = linkedinIcon;
            url = 'https://www.linkedin.com/company/';
            break;
        default:
            img = twitterIcon;
            url = 'https://twitter.com/';
    }

    return (
        <a className={classes.SocialButton} href={url} target="_blank" rel="noopener noreferrer">
            <img src={img} alt={props.type + ' icon'}/>
        </a>
    );
}

export default SocialButton;