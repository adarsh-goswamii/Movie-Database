import React from 'react';
import Logo from './Logo';
import MenuItem from './MenuItem';
import './Components_css/Header.css';
import SearchIcon from '@mui/icons-material/Search';


const Header = () => {
    return (
        <nav className="header">
            <div className="header__logo">
                <Logo />
            </div>
            <div className="header__menu">
                <MenuItem title="Movies" submenu={["popular", "Now Playing", "Upcoming", 'Top Rated']} />
                <MenuItem title="TV Shows" submenu={["popular", "Airing Today", 'Top Rated']} />
                <MenuItem title="People" submenu={["Popular People"]} />
                <MenuItem title="More" submenu={[]} />
            </div>
            <div className="header__tab">
                <SearchIcon className="header__tab__searchIcon" />
                <div className="header__tab__avatar"></div>
            </div>
        </nav>
    );
}

export default Header;