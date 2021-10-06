import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Homepage from './pages/Homepage';
import MovieDetails from './pages/MovieDetails';
import './index.css';

const API_key = 'd370300724b5dd3d75a44a46e93256c2';
const image_url = 'https://image.tmdb.org/t/p/original/';
const Index = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/homepage'>
                    <Homepage
                        api_key={API_key}
                        image_url={image_url}
                    />
                </Route>
                <Route path="/movie/:movieId">
                    <MovieDetails
                        api_key={API_key}
                        image_url={image_url}
                    />
                </Route>
                <Route path='/'>
                    <Redirect to='/movie/580489'/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

ReactDOM.render(<Index />, document.querySelector('#root'));