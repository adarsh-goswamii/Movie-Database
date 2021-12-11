import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Movie_card from "./Movie_card";
import Toggle from "./Toggle";
import Slider from './Slider';
import '../CSS/Movie.css';
import { useDispatch, useSelector } from "react-redux";
import toggle_actions from '../store/ToggleSlice';

const Trending = (props) => {
    const [today, setToday] = useState({ loading: true, data: [] });
    const [week, setWeek] = useState({ loading: true, data: [] });

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${props.api_key}&page=1`)
            .then(data => data.json())
            .then(({ results }) => {
                results.map(({ id, poster_path, title, release_date, overview }) => {
                    let temp = { id, poster_path, title, release_date, overview };
                    setToday(({ data }) => ({ loading: false, data: [...data, temp] }));
                });
            });

        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${props.api_key}&page=1`)
            .then(data => data.json())
            .then(({ results }) => {
                results.map(({ id, poster_path, title, release_date, overview }) => {
                    let temp = { id, poster_path, title, release_date, overview };
                    setWeek(({ data }) => ({ loading: false, data: [...data, temp] }));
                });
            });
    }, []);

    const dispatch = useDispatch();
    const { trending } = useSelector(state => state.Toggle);

    return (
        <section
            className="movie">
            <div className="movie__head">
                <h3 className="movie__heading">Trending</h3>
                <Toggle
                    id="trending"
                    click={() => dispatch(toggle_actions.trendingToggle())}
                    className="trending__toggle"
                    options={["Today", "This Week"]} />
            </div>
            <Slider key="trending" for="-trending">
                {
                    trending === "Today" ?
                        today.loading === true ? <p> LOADING </p> :
                            today.data.map(({ title, id: key, poster_path: backdrop_path, overview, release_date }) => {
                                return (
                                    <div
                                        key={key}
                                        className="slider__container__card">
                                        <Link to={`/movie/${key}`}>
                                            <Movie_card
                                                id={key}
                                                movie_name={title}
                                                overview={overview}
                                                release_date={release_date}
                                                image_url={`${props.image_url}${backdrop_path}`}
                                            />
                                        </Link>
                                    </div>
                                );
                            })
                        :
                        week.loading === true ? <p> LOADING </p> :
                            week.data.map(({ title, id: key, poster_path: backdrop_path, overview, release_date }) => {
                                return (
                                    <div
                                        key={key}
                                        className="slider__container__card">
                                        <Link to={`/movie/${key}`}>
                                            <Movie_card
                                                id={key}
                                                movie_name={title}
                                                overview={overview}
                                                release_date={release_date}
                                                image_url={`${props.image_url}${backdrop_path}`}
                                            />
                                        </Link>
                                    </div>
                                );
                            })
                }
            </Slider>
        </section>
    );
}

export default Trending;