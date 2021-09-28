import React, {useState} from 'react';
import Trailer_card from './Trailer_card';
import Toggle from './Toggle';
import Slider from './Slider';
import './Components_css/Trailer.css';

const Trailer = () => {
    const [checked, setChecked] = useState('unchecked');

    // * Fetching popular movies from api for the background image.
    // const popular_movies = async () => {
    //     const response = fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${props.api_key}&language=en-US&page=1`)
    //         .then(result => result.json())
    //         .then(({ results }) => {
    //             if (results === null || results === undefined) {
    //                 // * If incase something goes haywire display a default image.
    //                 setImage('https://wallpapercave.com/wp/wp2022711.jpg');
    //             } else {
    //                 setImage(`${props.image_url}${results[0].backdrop_path}`);
    //             }
    //         });
    // };
    // popular_movies();

    // const 

    return (
        <section className="trailer">
            <div className="trailer__head">
                <h3 className="trailer__heading">Latest Trailers</h3>
                <Toggle
                    className="trailer__toggle"
                    options={["In Threatres", "Television"]} />
            </div>
            <Slider>
                <div className="slider__container__card"><Trailer_card /></div>
                <div className="slider__container__card"><Trailer_card /></div>
                <div className="slider__container__card"><Trailer_card /></div>
                <div className="slider__container__card"><Trailer_card /></div>
                <div className="slider__container__card"><Trailer_card /></div>
                <div className="slider__container__card"><Trailer_card /></div>
                <div className="slider__container__card"><Trailer_card /></div>
                <div className="slider__container__card"><Trailer_card /></div>
            </Slider>
        </section>
    );
}

export default Trailer;