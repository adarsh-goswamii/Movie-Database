import React, { useEffect, useState } from 'react';
import Trailer_card from './Trailer_card';
import Toggle from './Toggle';
import Slider from './Slider';
import '../CSS/Trailer.css';
import { useDispatch, useSelector } from 'react-redux';
import toggle_actions from '../store/ToggleSlice';

const Trailer = (props) => {
    let i = 0;
    let temp_popular = {};
    const [theatre, setTheatre] = useState({ loading: true, data: [] });
    const [popular, setPopular] = useState({ loading: true, data: [] });

    useEffect(() => {
        function get_theatre_movies() {
            fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${props.api_key}&page=1`)
                .then(data => data.json())
                .then(({ results }) => {
                    results.map(async (movie) => {
                        // console.log("map iteration started");
                        let video_path = await getVideos(movie.id);
                        // console.log("Got the result from getVideos", video_path);
                        const temp = {
                            id: movie.id,
                            movie_name: movie.title,
                            backdrop_path: movie.backdrop_path,
                            video_path: video_path
                        };

                        // console.log("temp", temp);
                        setTheatre(({ data }) => {
                            // console.log("data", data);
                            return { loading: false, data: [...data, temp] }
                        });
                    });
                });
        }

        function get_popular_movies() {
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${props.api_key}&page=1`)
                .then(data => data.json())
                .then(({ results }) => {
                    results.map(async (movie) => {
                        // console.log("map iteration started");
                        let video_path = await getVideos(movie.id);
                        // console.log("Got the result from getVideos", video_path);
                        const temp = {
                            id: movie.id,
                            backdrop_path: movie.backdrop_path,
                            video_path: video_path,
                            movie_name: movie.title
                        };

                        // console.log("temp", temp);
                        setPopular(({ data }) => {
                            // console.log("data", data);
                            return { loading: false, data: [...data, temp] }
                        });
                    });
                });
        }

        get_theatre_movies();
        get_popular_movies();
    }, []);

    // * Now when we have the movies id we can search for videos that where released on youtube.
    async function getVideos(id) {
        // console.log("get videos invoked");
        let response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${props.api_key}`)
            .then((data) => data.json())
            .then(({ results }) => {
                for (let data of results) {
                    // console.log(data);
                    if (data.site === 'YouTube' && data.type === 'Trailer') {
                        // console.log("value returned");
                        return data.key;
                    }
                }
            });

        return response;
    };


    let poster = theatre.data.length > 0 ?
        `${props.image_url}${theatre.data[0].backdrop_path}` :
        "https://c4.wallpaperflare.com/wallpaper/308/457/73/penguins-of-madagascar-funny-movie-wallpaper-preview.jpg";
    poster = `url("${poster}")`;

    let poster2 = popular.data.length > 0 ?
        `${props.image_url}${popular.data[0].backdrop_path}` :
        "https://c4.wallpaperflare.com/wallpaper/308/457/73/penguins-of-madagascar-funny-movie-wallpaper-preview.jpg";
    poster2 = `url("${poster2}")`;

    const dispatch= useDispatch();
    const { latestTrailer } = useSelector(state=> state.Toggle );
    
    const someStyle = {
        "--img-url": latestTrailer=== "InTheatre" ? poster: poster2
    }

    return (
        <section
            style={someStyle}
            className="trailer">
            <div className="trailer__head">
                <h3 className="trailer__heading">Latest Trailers</h3>
                <Toggle
                    id="trailer"
                    click={()=> dispatch(toggle_actions.trailerToggle())}
                    className="trailer__toggle"
                    options={["In Threatres", "Trending"]} />
            </div>
            <Slider key="trailer" for="-trailer">
                {
                    latestTrailer === "InTheatre" ?
                        theatre.loading === true ? <p> LOADING </p> :
                            theatre.data.map(({ movie_name, id: key, backdrop_path, video_path }) => {
                                return (
                                    <div
                                        key={key}
                                        className="slider__container__card">
                                        <Trailer_card
                                            id={key}
                                            movie_name={movie_name}
                                            link={video_path}
                                            play_video={props.play_video}
                                            image_url={`${props.image_url}${backdrop_path}`}
                                        />
                                    </div>
                                );
                            })
                        :
                        popular.loading === true ? <p> LOADING </p> :
                            popular.data.map(({ movie_name, id: key, backdrop_path, video_path }) => {
                                return (
                                    <div
                                        key={key}
                                        className="slider__container__card">
                                        <Trailer_card
                                            id={key}
                                            link={video_path}
                                            movie_name={movie_name}
                                            play_video={props.play_video}
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

export default Trailer;