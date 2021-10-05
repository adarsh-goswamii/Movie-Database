import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Homepage from './pages/Homepage';
import './index.css';

const API_key = 'd370300724b5dd3d75a44a46e93256c2';
const image_url = 'https://image.tmdb.org/t/p/original/';
const Index = () => {
    return (
        <Homepage
            api_key= {API_key}
            image_url={image_url}
        />
    );
}

ReactDOM.render(<Index />, document.querySelector('#root'));