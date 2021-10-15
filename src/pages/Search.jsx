import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Movie_card from '../Components/Movie_card';
import '../CSS/Search.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import superbun from '../IMAGES/superbun.jpg';

const Search = (props) => {
    const [btnstate, setBtnState] = useState(false);
    const [genres, setGenres] = useState([]);
    const [explore, setExplore] = useState({
        keyword: null,
        sort: 'popularity.desc',
        genre: new Set()
    });

    const [data, setData] = useState([]);
    const location = useLocation();
    const history = useHistory();

    useEffect(async () => {
        setBtnState(false);
        setGenres([]);
        setExplore({
            keyword: null,
            sort: 'popularity.desc',
            genre: new Set()
        });
        setData([]);

        const query_params = new URLSearchParams(location.search);
        let tsort = query_params.get('sort');
        let tgenre = query_params.get('genre');
        let tkeyword = query_params.get('keyword');
        // console.log('tgenre', tkeyword);

        if (tsort != null && tsort != undefined) setExplore(prev => ({ ...prev, sort: tsort }));
        if (tgenre != null && tgenre != undefined && tgenre.length != 0) setExplore(prev => ({ ...prev, genre: new Set(tgenre.split(',')) }));
        if (tkeyword != null && tkeyword != undefined) setExplore(prev => ({ ...prev, keyword: tkeyword }));

        // ! GENRES
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${props.api_key}&language=en-US`)
            .then(data => data.json())
            .then(({ genres }) => {
                genres.map(i => {
                    setGenres(prev => [...prev, i]);
                });
            });

        let arr = Array.from(explore.genre);
        let var_genre = "";
        for (let key of arr) var_genre = var_genre + key + ",";
        var_genre = var_genre.substring(0, var_genre.length - 1);

        if (tkeyword == 'null' || tkeyword == undefined || tkeyword == null) {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d370300724b5dd3d75a44a46e93256c2&language=en-US&sort_by=${explore.sort}&include_adult=false&include_video=false&page=1&with_genres=${var_genre}&with_watch_monetization_types=flatrate`)
                .then(data => data.json())
                .then(({ results }) => {
                    results.map(({ poster_path, id, title, overview, release_date }) => {
                        setData(prev => [...prev, { poster_path, id, title, overview, release_date }]);
                    });
                });
        } else {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=d370300724b5dd3d75a44a46e93256c2&language=en-US&query=${tkeyword}&page=1&include_adult=false`)
                .then(data => data.json())
                .then(({ results }) => {
                    results.map(({ poster_path, id, title, overview, release_date }) => {
                        setData(prev => [...prev, { poster_path, id, title, overview, release_date }]);
                    });
                });
        }


        setExplore(prev => ({ ...prev, genre: new Set(), keyword: null }));
        console.log(genres);

    }, [location.search]);

    function activeGenre(e) {
        setBtnState(true);
        if (!e.target.classList.contains("explore__criteria__filter__genres__options--active")) {
            explore.genre.add(e.target.id);
            setExplore(prev => ({ ...prev, genre: new Set([...prev.genre, e.target.id]) }));
            e.target.classList.add("explore__criteria__filter__genres__options--active");
        } else {
            setExplore(prev => {
                let data = prev.genre;
                data.delete(e.target.id);
                return { ...prev, genre: data };
            });
            e.target.classList.remove("explore__criteria__filter__genres__options--active");
        }
    }

    function handleKeyPressed(e) {
        setBtnState(true);
        if (e.keyCode == 13) {
            console.log(e.target.value);
            explore.keyword = e.target.value;
            e.target.value = "";
            handleSearch();
        }
    }

    function handleSort(e) {
        setBtnState(true);
        setExplore(prev => ({ ...prev, sort: `${e.target.value}` }));
    }

    function handleSearch() {
        let arr = Array.from(explore.genre);
        let var_genre = "";
        for (let key of arr) var_genre = var_genre + key + ",";
        var_genre = var_genre.substring(0, var_genre.length - 1);
        history.push(`/Search?sort=${explore.sort}&genre=${var_genre}&keyword=${explore.keyword}`);
    }

    return (
        <>
            <Header />
            <div className="explore">
                <div className="explore__criteria">
                    <div className="explore__criteria__search">
                        <input
                            type="text"
                            onKeyUp={handleKeyPressed}
                            onChange={e => setExplore(prev => ({ ...prev, keyword: `${e.target.value}` }))}
                            className="explore__criteria__search__text"
                            placeholder="Search for a movie, shows...." />
                        <SearchIcon className="explore__criteria__search__icon" />
                    </div>
                    <div className="explore__criteria__sort">
                        <h3 className="explore__criteria__heading">SORT</h3>
                        <div className="explore__criteria__sort__submenu explore__criteria__sort__submenu--visible">
                            <select
                                id="country"
                                name="country"
                                onChange={handleSort}
                                className="submenu__custom-select">
                                <option
                                    className="sort__submenu__dropdown__option"
                                    value="popularity.asc">Popularity Asc</option>
                                <option
                                    className="sort__submenu__dropdown__option"
                                    value="popularity.desc">Popularity Desc</option>
                                <option
                                    className="sort__submenu__dropdown__option"
                                    value="release_date.asc">Release Date Asc</option>
                                <option
                                    className="sort__submenu__dropdown__option"
                                    value="release_date.desc">Release Date Desc</option>
                                <option
                                    className="sort__submenu__dropdown__option"
                                    value="original_title.asc">Title Asc</option>
                                <option
                                    className="sort__submenu__dropdown__option"
                                    value="original_title.desc">Title Desc</option>
                            </select>
                            <span className="sort__submenu__arrow">
                                <ArrowDropDownIcon className="class" />
                            </span>
                        </div>
                    </div>
                    <div className="explore__criteria__filter">
                        <h3 className="explore__criteria__heading">FILTER GENRE</h3>
                        {/* <h3 className="explore__criteria__subheading">Genre</h3> */}
                        <div className="explore__criteria__filter__genres">
                            {
                                genres.map(({ id, name }) => {
                                    return <p
                                        key={id}
                                        id={id}
                                        onClick={activeGenre}
                                        className="explore__criteria__filter__genres__options">
                                        {name}
                                    </p>;
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="explore__data">
                    {
                        data.length == 0 ?
                            <div className="explore__not-found">
                                <div className="explore__not-found__data">
                                    <h1 className="not-found__heading">Sorry! We could not found any results to your search.</h1>
                                    <h1 className="not-found__sub-heading">Don’t Worry <span className="superbun">SUPERBUN</span> got you covered click on the explore button to choose from a list of movies and shows to watch.</h1>
                                    <button
                                        className="not-found__explore"
                                        onClick={() => history.push('/Search??sort=popularity.desc&genre=&keyword=null')}
                                        onSubmit={(e) => e.preventDefault()}>EXPLORE</button>
                                </div>
                                <div className="explore__not-found__image">
                                    <img className="explore__not-found__image__img" src={superbun} alt="" />
                                </div>
                            </div>
                            : // else 
                            data.map(({ title, id: key, poster_path: backdrop_path, overview, release_date }) => {
                                return (
                                    <div
                                        key={key}
                                        className="search__container__card">
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
                </div>
                <div
                    onClick={handleSearch}
                    className={`explore__search-btn ${btnstate ? "explore__search-btn--active" : ""}`}>
                    Search
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Search;