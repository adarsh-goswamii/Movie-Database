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
                    <InstagramIcon className="social-handles__instagram-icon" />
                    <LinkedInIcon className="social-handles__linkedin-icon" />
                    <GitHubIcon className="social-handles__github-icon" />
                </div>
            </div>

            <div className="footer__column-two">
                <h3 className="footer_column-two__title">The Basics</h3>
                <p className="footer_column-two__subheading-1">About TMBD</p>
                <p className="footer_column-two__subheading-2">Contact Us</p>
                <p className="footer_column-two__subheading-3">Support Forums</p>
                <p className="footer_column-two__subheading-4">API</p>
                <p className="footer_column-two__subheading-5">System Status</p>
            </div>

            <div className="footer__column-three">
                <h3 className="footer_column-three__title">The Basics</h3>
                <p className="footer_column-three__subheading-1">About TMBD</p>
                <p className="footer_column-three__subheading-2">Contact Us</p>
                <p className="footer_column-three__subheading-3">Support Forums</p>
                <p className="footer_column-three__subheading-4">API</p>
                <p className="footer_column-three__subheading-5">System Status</p>
            </div>

            <div className="footer__column-four">
                <h3 className="footer_column-four__title">The Basics</h3>
                <p className="footer_column-four__subheading-1">About TMBD</p>
                <p className="footer_column-four__subheading-2">Contact Us</p>
                <p className="footer_column-four__subheading-3">Support Forums</p>
                <p className="footer_column-four__subheading-4">API</p>
                <p className="footer_column-four__subheading-5">System Status</p>
            </div>

            <div className="footer__column-five">
                <h3 className="footer_column-five__title">The Basics</h3>
                <p className="footer_column-five__subheading-1">About TMBD</p>
                <p className="footer_column-five__subheading-2">Contact Us</p>
                <p className="footer_column-five__subheading-3">Support Forums</p>
                <p className="footer_column-five__subheading-4">API</p>
                <p className="footer_column-five__subheading-5">System Status</p>
            </div>

        </footer>
    );
}

export default Footer;