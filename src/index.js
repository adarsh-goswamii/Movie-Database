import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Poster from './Components/Poster';
import Toggle from './Components/Toggle';
import './index.css';

const API_key= 'd370300724b5dd3d75a44a46e93256c2';
const image_url= 'https://image.tmdb.org/t/p/original/';
const Index= ()=> {
    return (
        <>
            <Header/>
            <Poster api_key={API_key} image_url={image_url}/>
            <Toggle options={["In Threatre", "Popular"]}/>
            <Footer/>
        </>
    );
}

ReactDOM.render(<Index/>, document.querySelector('#root'));