import React, { useEffect, useState } from 'react';
import { useParams, Route } from 'react-router';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../CSS/MovieDetails.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';
import Trailer_card from '../Components/Trailer_card';
import Player from '../Components/Player';

const MovieDetails = (props) => {
    const params = useParams();
    let [loading, setLoading] = useState(false);
    let [movie, setMovie] = useState({});
    let [cast, setCast] = useState([]);
    let [videos, setVideos] = useState([]);
    let [similar_movies, setSimilarMovies] = useState([]);
    let [backdrop, setBackdrop] = useState([]);
    const [url, setUrl] = useState("");
    const [playState, setPlayState] = useState("not visible");

    useEffect(() => {
        setLoading(true);
        let id = params.movieId;

        // * Fetching backdrop paths a.k.a landscape posters.
        fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${props.api_key}`)
            .then(data => data.json())
            .then(({ backdrops }) => {
                backdrops.map(i => {
                    let { file_path } = i;
                    setBackdrop(prev => [...prev, file_path]);
                })
            });

        // * Fetching details about the movie using api key from useParams.
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${props.api_key}&language=en-US`)
            .then(data => data.json())
            .then(data => {
                let { backdrop_path,
                    poster_path,
                    title,
                    tagline,
                    overview,
                    release_date,
                    runtime,
                    genres } = data;
                setMovie({ backdrop_path, poster_path, title, tagline, overview, release_date, runtime, genres });
            });

        // * Fetching information about the cast of movie. 
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${props.api_key}&language=en-US`)
            .then(data => data.json())
            .then(({ cast }) => {
                cast.forEach(i => {
                    let { character, name, profile_path, id } = i;
                    setCast((prev) => [...prev, { character, name, profile_path, id }]);
                });
            });

        // * Fetching videos that are released on youtube like trailer, teaser and stuffs like that.
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${props.api_key}&language=en-US`)
            .then(data => data.json())
            .then(({ results }) => {
                results.forEach(i => {
                    let { site, type, key, name, id } = i;
                    if (site === 'YouTube')
                        setVideos(prev => [...prev, { site, type, key, name, id }]);
                })
            });

        // * Fetching movies that are similar to the movie with given id.
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${props.api_key}&language=en-US&page=1`)
            .then(data => data.json())
            .then(({ results }) => {
                results.forEach(i => {
                    let { title, poster_path, overview, release_date, id } = i;
                    setSimilarMovies(prev => [...prev, { title, poster_path, overview, release_date, id }]);
                    setLoading(false);
                });
            });

    }, []);

    function formatDate(release_date) {
        if (release_date == undefined || release_date == null) return "";
        let month = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let year = release_date.substring(0, 4), mon = release_date.substring(5, 7), date = release_date.substring(8, 10);
        release_date = `${date} ${month[parseInt(mon)]}, ${year}`;
        return release_date;
    }

    function appendGenre(genre) {
        if (null == genre || undefined == genre) return '';
        let ret = genre.map(({ name }) => name);
        return ret.join(', ');
    }

    function playVideo(link, state) {
        link = `https://www.youtube.com/embed/${link}`;
        setUrl(link);
        setPlayState(state);
    }

    let counter = 0;
    return (
        <>
            <Player
                url={url}
                playState={playState}
                setPlayState={setPlayState}
                play_video={playVideo} />

            <div className={playState == 'visible' ? "wrapper--hidden" : "wrapper"}>
                <Header />
                <div className="movie-detail">
                    <div
                        style={{ backgroundImage: `url(${props.image_url}${movie.backdrop_path})` }}
                        className="movie-detail__hero">
                        <img
                            src={`${props.image_url}${movie.poster_path}`}
                            alt="movie poster"
                            className="movie-detail__hero__poster" />
                        <div className="movie-detail__hero__info">
                            <h1 className="movie-detail__hero__info__heading">
                                {movie.title}
                            </h1>
                            <p className="movie-detail__hero__info__subheading">
                                {`${formatDate(movie.release_date)} • 
                            ${appendGenre(movie.genres)} • ${parseInt(movie.runtime / 60)}hr ${movie.runtime % 60}min`}
                            </p>
                            <div className="movie-detail__hero__info__icons">
                                <div className="movie-detail__hero__info__icons__1"><BookmarkIcon /></div>
                                <div className="movie-detail__hero__info__icons__2"><FavoriteIcon /></div>
                                <div className="movie-detail__hero__info__icons__3"><StarIcon /></div>
                            </div>
                            <h4 className="movie-detail__hero__info__tagline">
                                {movie.tagline}
                            </h4>
                            <h3 className="movie-detail__hero__info__heading-overview">
                                Overview
                            </h3>
                            <p className="movie-detail__hero__info__preview">
                                {movie.overview}
                            </p>
                            <div className="movie-detail__hero__info__videos">
                                {
                                    videos.map(({ id, key, name, type, site }) => {
                                        return (
                                            <div className="slider__container__card">
                                                <Trailer_card
                                                    key={id}
                                                    id={id}
                                                    link={key}
                                                    movie_name={name}
                                                    image_url={`${props.image_url}${backdrop[(counter++) % backdrop.length]}`}
                                                    play_video={playVideo} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="movie-detail__cast"></div>
                    <div className="movie-detail__similar"></div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default MovieDetails;