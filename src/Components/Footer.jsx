import React from 'react';
import Logo from './Logo';
import CopyrightIcon from '@mui/icons-material/Copyright';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Components_css/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__column-one">
                <div className="footer__coloumn-one">
                    <Logo className="footer__column-one__logo" />
                    <div className="footer__column-one__copyright">
                        <CopyrightIcon className="copyright__icon" />
                        <p className="copyright__text">
                            All rights reserved 2021- ----
                        </p>
                    </div>
                    <p className="footer__column-one__name">
                        Adarsh Goswami
                    </p>
                </div>
                <div className="footer__column-one__social-handles">
                    <a href="https://www.instagram.com/adarsh010120/"><InstagramIcon className="social-handles__instagram-icon" /></a>
                    <a href="https://www.linkedin.com/in/adarsh-goswami/"><LinkedInIcon className="social-handles__linkedin-icon" /></a>
                    <a href="https://github.com/Adarsh-Goswamii"><GitHubIcon className="social-handles__github-icon" /></a>
                </div>
            </div>

            <div className="footer__column-two">
                <h3 className="footer__column-two__title">The Basics</h3>
                <p className="footer__column-two__subheading-1">About TMBD</p>
                <p className="footer__column-two__subheading-2">Contact Us</p>
                <p className="footer__column-two__subheading-3">Support Forums</p>
                <p className="footer__column-two__subheading-4">API</p>
                <p className="footer__column-two__subheading-5">System Status</p>
            </div>

            <div className="footer__column-three">
                <h3 className="footer__column-three__title">The Basics</h3>
                <p className="footer__column-three__subheading-1">About TMBD</p>
                <p className="footer__column-three__subheading-2">Contact Us</p>
                <p className="footer__column-three__subheading-3">Support Forums</p>
                <p className="footer__column-three__subheading-4">API</p>
                <p className="footer__column-three__subheading-5">System Status</p>
            </div>

            <div className="footer__column-four">
                <h3 className="footer__column-four__title">The Basics</h3>
                <p className="footer__column-four__subheading-1">About TMBD</p>
                <p className="footer__column-four__subheading-2">Contact Us</p>
                <p className="footer__column-four__subheading-3">Support Forums</p>
                <p className="footer__column-four__subheading-4">API</p>
                <p className="footer__column-four__subheading-5">System Status</p>
            </div>

            <div className="footer__column-five">
                <h3 className="footer__column-five__title">The Basics</h3>
                <p className="footer__column-five__subheading-1">About TMBD</p>
                <p className="footer__column-five__subheading-2">Contact Us</p>
                <p className="footer__column-five__subheading-3">Support Forums</p>
                <p className="footer__column-five__subheading-4">API</p>
                <p className="footer__column-five__subheading-5">System Status</p>
            </div>

        </footer>
    );
}

export default Footer;