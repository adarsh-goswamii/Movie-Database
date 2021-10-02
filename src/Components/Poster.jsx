import React, { useState } from 'react';
import './Components_css/Poster.css';

const Poster = (props) => {
    const [image, setImage] = useState('');

    // * Fetching popular movies from api for the background image.
    const popular_movies = async () => {
        const response = fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${props.api_key}&language=en-US&page=1`)
            .then(result => result.json())
            .then(({ results }) => {
                if (results === null || results === undefined) {
                    // * If incase something goes haywire display a default image.
                    setImage('https://wallpapercave.com/wp/wp2022711.jpg');
                } else {
                    setImage(`${props.image_url}${results[0].backdrop_path}`);
                    console.log(image);
                }
            });
    };
    popular_movies();

    function handleOnSubmit(e) {
        e.preventDefault();

        // TODO: navigate to page where we can show a list of movies related to the search
    }

    return (
        <div className="hero" style={{ backgroundImage: `url(${image})` }}>
            <h1 className="hero__heading">Welcome</h1>
            <h3 className="hero__sub-heading">
                Millions of movies, TV shows and people to discover. Explore now.
            </h3>

            <div className="hero__search">
                <input 
                placeholder="Search for Movies, Tv shows, person....."
                type="text" 
                className="hero__search__input" 
                onSubmit={handleOnSubmit}/>

                <div className="hero__search__button">
                    Search
                </div>
            </div>
    
        </div>
    );
}

export default Poster;