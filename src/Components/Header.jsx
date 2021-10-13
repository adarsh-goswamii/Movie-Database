import React from 'react';
import Logo from './Logo';
import MenuItem from './MenuItem';
import '../CSS/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';



const Header = () => {

    return (
        <nav className="header">
            <div className="header__logo">
                <Logo />
            </div>
            <div className="header__menu">
                <MenuItem
                    title="Movies"
                    submenu={[{ name: "Popular", link: '/Search?sort=popularity.desc&genre=&keyword=null' },
                    { name: "Now Playing", link: '/Search?sort=popularity.desc&genre=&keyword=null' },
                    { name: "Upcoming", link: '/Search?sort=popularity.desc&genre=&keyword=null' },
                    { name: 'Top Rated', link: '/Search?sort=popularity.desc&genre=&keyword=null' }]}

                />
                <MenuItem
                    title="TV Shows"
                    submenu= {[{ name: "Popular", link: '/Search?sort=popularity.desc&genre=&keyword=null' },
                    { name: "Airing Today", link: '/Search?sort=popularity.desc&genre=&keyword=null' },
                    { name: 'Top Rated', link: '/Search?sort=popularity.desc&genre=&keyword=null' }]}
                />
                <MenuItem
                    title="People"
                    submenu= {[{ name: "Popular People", link: '/Search?sort=popularity.desc&genre=&keyword=null' }]}
                />
                <MenuItem
                    title="More"
                    submenu={["Discussion", "Leaderborad", "Support"]}
                    submenu= {[{ name: "Discussion", link: '/Search?sort=popularity.desc&genre=&keyword=null' },
                    { name: "Leaderboard", link: '/Search?sort=popularity.desc&genre=&keyword=null' },
                    { name: 'Support', link: '/Search?sort=popularity.desc&genre=&keyword=null' }]}
                     />
            </div>
            <div className="header__tab">
                <Link to="/Search">
                    <SearchIcon className="header__tab__searchIcon" />
                </Link>
                <div className="header__tab__avatar"></div>
            </div>
        </nav>
    );
}

export default Header;