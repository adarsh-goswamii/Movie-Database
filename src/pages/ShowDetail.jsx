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
import ProgressBar from '../Components/ProgressBar';
import PersonCard from '../Components/Person_card';
import Slider from '../Components/Slider'
import MovieCard from '../Components/Movie_card';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ShowDetail = (props) => {
    let counter= 1;
    let [reload, setReload] = useState(true);
    const params = useParams();
    let history = useHistory();
    let [loading, setLoading] = useState(false);
    let [movie, setMovie] = useState({});
    let [cast, setCast] = useState([]);
    let [videos, setVideos] = useState([]);
    let [similar_movies, setSimilarMovies] = useState([]);
    let [backdrop, setBackdrop] = useState([]);
    const [url, setUrl] = useState("");
    const [playState, setPlayState] = useState("not visible");

    useEffect(() => {
        counter= 1;
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setLoading(true);
        setMovie([]);
        setCast([]);
        setVideos([]);
        setSimilarMovies([]);
        setBackdrop([]);
        let id = params.showId;

        // ! POSTERS
        fetch(`https://api.themoviedb.org/3/tv/${id}/images?api_key=${props.api_key}`)
            .then(data => data.json())
            .then(({ backdrops }) => {
                backdrops.map(i => {
                    let { file_path } = i;
                    setBackdrop(prev => [...prev, file_path]);
                })
            });

        // ! INFORMATION
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${props.api_key}&language=en-US`)
            .then(data => data.json())
            .then(data => {
                let { backdrop_path,
                    poster_path,
                    name: title,
                    tagline,
                    overview,
                    first_air_date: release_date,
                    episode_run_time: runtime,
                    vote_average,
                    genres } = data;
                release_date = release_date.length == 0 ? 60 : release_date[0];
                setMovie({ vote_average, backdrop_path, poster_path, title, tagline, overview, release_date, runtime, genres });
            });

        // ! CAST. 
        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${props.api_key}`)
            .then(data => data.json())
            .then(({ cast: _cast }) => {
                _cast.forEach(i => {
                    let { character, name, profile_path, id } = i;
                    if (profile_path === null || profile_path === undefined) { }
                    else setCast((prev) => [...prev, { character, name, profile_path, id }]);
                });
            });

        // ! YOUTUBE VIDEOS
        fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${props.api_key}&language=en-US`)
            .then(data => data.json())
            .then(({ results }) => {
                results.forEach(i => {
                    let { site, type, key, name, id } = i;
                    if (site === 'YouTube')
                        setVideos(prev => [...prev, { site, type, key, name, id }]);
                })
            });

        // ! SIMILAR MOVIES
        fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${props.api_key}&language=en-US&page=1`)
            .then(data => data.json())
            .then(({ results }) => {
                results.forEach(i => {
                    let { name: title, poster_path, overview, first_air_date: release_date, id } = i;
                    setSimilarMovies(prev => [...prev, { title, poster_path, overview, release_date, id }]);
                    setLoading(false);
                });
            });

    }, [params.showId]);

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

    function backdropReturn() {
        let ret = props.image_url + backdrop[(counter) % backdrop.length];
        counter += 1;
        return ret;
    }

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
                                <ProgressBar percentage={movie.vote_average * 10} />
                                <pre className="movie-detail__hero__info__user-score">{'User\nScore'}</pre>
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
                                            <div className="slider__container__card" key={id}>
                                                <Trailer_card
                                                    key={id}
                                                    id={id}
                                                    link={key}
                                                    movie_name={name}
                                                    image_url={backdropReturn(counter)}
                                                    play_video={playVideo} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="movie-detail__cast">
                        <h2 className="movie-detail__cast__heading">Top Billed Casts</h2>
                        <Slider for="cast">
                            {
                                cast.map(({ character, name, profile_path, id }) => {
                                    return (
                                        <div className="slider__container__card" key={id}>
                                            <PersonCard
                                                id={id}
                                                name={name}
                                                image_url={`${props.image_url}${profile_path}`}>
                                                <h3 className="person-card__info__name">{name}</h3>
                                                <h4 className="person-card__info__character">{character}</h4>
                                                <h5 className="person-card__info__subheading">( Character Played )</h5>
                                            </PersonCard>
                                        </div>
                                    );
                                })
                            }
                        </Slider>
                    </div>
                    <div className="movie-detail__similar">
                        <h2 className="movie-detail__similar__heading">Similar Movies</h2>
                        <Slider for="similar">
                            {
                                similar_movies.map(({ title, poster_path, overview, release_date, id }) => {
                                    return (
                                        <div className="slider__container__card" key={id}>
                                            <Link to={`/show/${id}`}>
                                                <MovieCard
                                                    onClick={() => {
                                                        history.replace(`/show/${id}`);
                                                    }}
                                                    id={id}
                                                    movie_name={title}
                                                    release_date={release_date}
                                                    overview={overview}
                                                    image_url={`${props.image_url}${poster_path}`} />
                                            </Link>
                                        </div>
                                    );
                                })
                            }
                        </Slider>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default ShowDetail;