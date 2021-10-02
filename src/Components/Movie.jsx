import React, { useEffect, useState } from "react";
import Movie_card from "./Movie_card";
import Toggle from "./Toggle";
import Slider from './Slider';
import './Components_css/Movie.css';

const Movie = (props) => {
    const [checked, setChecked]= useState(true);
    const [movie, setMovie]= useState({loading: true, data:[]});
    
    useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${props.api_key}&page=1`)
        .then(data=> data.json())
        .then(({results})=> {
            results.map(({id, poster_path, title, release_date, overview})=> {
                let temp= { id, poster_path, title, release_date, overview };
                setMovie(({data})=> ({loading: false, data: [...data, temp]}));
            });
        });
    }, []);

    function handleState() {
        console.log("Change State");
        if(checked) setChecked(false);
        else setChecked(true);
    }

    return (
        <section
            className="movie">
            <div className="movie__head">
                <h3 className="movie__heading">What's Popular</h3>
                <Toggle
                    click={handleState}
                    className="movie__toggle"
                    options={["In Theatres", "On TV"]} />
            </div>
            <Slider key="movie" for="-movie">
                {
                    movie.loading == true ? <p> LOADING </p> :
                        movie.data.map(({ title, id: key, poster_path: backdrop_path, overview, release_date }) => {
                            return (
                                <div
                                    key={key}
                                    className="slider-movie__container__card">
                                    <Movie_card
                                        id={key}
                                        movie_name={title}
                                        overview={overview}
                                        release_date={release_date}
                                        image_url={`${props.image_url}${backdrop_path}`}
                                    />
                                </div>
                            );
                        })
                }
            </Slider>
        </section>
    );
}

export default Movie;