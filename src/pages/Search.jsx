import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Movie_card from '../Components/Movie_card';
import '../CSS/Search.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';

const Search = (props) => {
    const [btnstate, setBtnState]= useState(false); 
    const [render, setRender] = useState(false);
    const [genres, setGenres] = useState([]);
    const [explore, setExplore] = useState({
        keyword: null,
        sort: 'popularity.desc',
        genre: []
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        setBtnState(false);
        setGenres([]);
        setExplore({
            keyword: null,
            sort: 'popularity.desc',
            genre: new Set()
        });
        setData([]);

        // ! GENRES
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${props.api_key}&language=en-US`)
            .then(data => data.json())
            .then(({ genres }) => {
                genres.map(i => {
                    setGenres(prev => [...prev, i]);
                });
            });
    }, [render]);

    function activeGenre(e) {
        setBtnState(true);
        if (!e.target.classList.contains("explore__criteria__filter__genres__options--active")) {
            explore.genre.add(e.target.id);
            setExplore(prev => ({ ...prev, genre: new Set([...prev.genre, e.target.id]) }));
            e.target.classList.add("explore__criteria__filter__genres__options--active");
        } else {
            setExplore(prev => {
                let data= prev.genre;
                data.delete(e.target.id);
                return {...prev, genre: data};
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
            setRender(prev => !prev);
        }
    }

    function handleSort(e) {
        setBtnState(true);
        setExplore(prev=> ({...prev, sort: `${e.target.value}`}));
    }

    function handleSearch() {
        
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
                    <h1>{explore.sort}</h1>
                    <div>{
                        [...explore.genre].map(name => {
                            return <p>{name}</p>;
                        })
                    }
                    </div>
                    <h2>hiiii</h2>
                    {
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
                    className={`explore__search-btn ${btnstate? "explore__search-btn--active": ""}`}>
                    Search
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Search;