import React from 'react';
import MovieIcon from '@mui/icons-material/Movie';
import '../CSS/Logo.css';

const Logo= ()=> {
    return (
        <div className="logo">
            <MovieIcon className="logo__icon"/>
            <p className="logo__title1">Movie </p>
            <p className="logo__title2">Database</p>
        </div>
    );
}

export default Logo;