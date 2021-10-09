import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';
import '../CSS/Logo.css';

const Logo = () => {
    return (
        <Link to='/homepage'  id="logo">
            <div className="logo">
                <MovieIcon className="logo__icon" />
                <p className="logo__title1">Movie </p>
                <p className="logo__title2">Database</p>
            </div>
        </Link>
    );
}

export default Logo;