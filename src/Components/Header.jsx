import React from 'react';
import Logo from './Logo';
import MenuItem from './MenuItem';
import '../CSS/Header.css';
import SearchIcon from '@mui/icons-material/Search';


const Header = () => {
    
    return (
        <nav className="header">
            <div className="header__logo">
                <Logo />
            </div>
            <div className="header__menu">
                <MenuItem 
                    title="Movies" 
                    submenu={["Popular", "Now Playing", "Upcoming", 'Top Rated']}
                     />
                <MenuItem 
                    title="TV Shows" 
                    submenu={["Popular", "Airing Today", 'Top Rated']} 
                    />
                <MenuItem 
                    title="People" 
                    submenu={["Popular People"]} 
                    />
                <MenuItem 
                    title="More" 
                    submenu={["Discussion", "Leaderborad", "Support"]} />
            </div>
            <div className="header__tab">
                <SearchIcon className="header__tab__searchIcon" />
                <div className="header__tab__avatar"></div>
            </div>
        </nav>
    );
}

export default Header;