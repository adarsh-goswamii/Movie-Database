import React, { useState } from 'react';
import '../CSS/Poster.css';
import { useHistory } from 'react-router-dom';

const Poster = (props) => {
    const [keyword, setKeyword]= useState('');
    const [image, setImage] = useState('');
    const history= useHistory();

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
                    // console.log(image);
                }
            });
    };
    popular_movies();

    function handleKeyPressed(e) {
        if (e.keyCode == 13) {
            handleOnSubmit(e);
        }
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        // console.log("search");
        history.push(`/Search?sort=popularity.desc&genre=&keyword=${keyword}`);
    }

    return (
        <div className="hero" style={{ backgroundImage: `url(${image})` }}>
            <h1 className="hero__heading">Welcome</h1>
            <h3 className="hero__sub-heading">
                Millions of movies, TV shows and people to discover. Explore now.
            </h3>

            <div className="hero__search">
                <input 
                onKeyUp={handleKeyPressed}
                onChange={e=> setKeyword(e.target.value)}
                placeholder="Search for Movies, Tv shows, person....."
                type="text" 
                className="hero__search__input" 
                onSubmit={handleOnSubmit}/>

                <div 
                    onClick={handleOnSubmit}
                    className="hero__search__button">
                    Search
                </div>
            </div>
    
        </div>
    );
}

export default Poster;