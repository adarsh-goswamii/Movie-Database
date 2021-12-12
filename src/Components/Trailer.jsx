import React, { useEffect, useState } from 'react';
import Trailer_card from './Trailer_card';
import Toggle from './Toggle';
import Slider from './Slider';
import '../CSS/Trailer.css';
import { useDispatch, useSelector } from 'react-redux';
import toggle_actions from '../store/ToggleSlice';
import { TrailerData } from '../store/TrailerFetch';

const Trailer = (props) => {
    const [theatre, setTheatre] = useState({ loading: true, data: [] });
    const [popular, setPopular] = useState({ loading: true, data: [] });

    useEffect(async() => {
        let trailer_data= await TrailerData(props.api_key)();
        setTheatre({ loading: false, data: trailer_data.theatre});
        setPopular({ loading: false, data: trailer_data.trending});
    }, []);

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