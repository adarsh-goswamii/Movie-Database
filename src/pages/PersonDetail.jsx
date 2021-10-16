import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Movie_card from '../Components/Movie_card';
import '../CSS/PersonDetail.css';

const PersonDetail = (props) => {
    let params = useParams();
    let [detail, setDetail] = useState({});
    let [role, setRoles] = useState([]);

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/person/${params.personId}?api_key=${props.api_key}&language=en-US`)
            .then(data => data.json())
            .then(obj => {
                let { id, biography, gender, birthday, known_for_department, name, place_of_birth, profile_path } = obj;
                setDetail({ id, biography, gender, birthday, known_for_department, name, place_of_birth, profile_path });
            });

        fetch(`https://api.themoviedb.org/3/person/${params.personId}/movie_credits?api_key=${props.api_key}&language=en-US`)
            .then(data => data.json())
            .then(({cast, crew}) => {
                let new_cast= [], set= new Set();
                for(let obj of cast) {
                    if(set.has(obj.id) || obj.poster_path== null || obj.release_date== undefined || obj.release_date== null ||obj.release_date.length<= 4) continue;
                    else {
                        new_cast.push(obj);
                        set.add(obj.id);
                    }
                }

                for(let obj of crew) {
                    if(set.has(obj.id) || obj.poster_path== null || obj.release_date== undefined || obj.release_date== null || obj.release_date.length<= 4) continue;
                    else {
                        let { id, title, poster_path, release_date, overview, job: character } = obj;
                        new_cast.push({ id, title, poster_path, release_date, overview, character });
                        set.add(obj.id);
                    }
                }
                
                function compare(a, b) {
                    return b.release_date.localeCompare(a.release_date);
                }

                new_cast= new_cast.sort(compare);
                console.log(new_cast);
                return {new_cast};
            })
            .then(({ new_cast }) => {
                new_cast.map(obj => {
                    let { id, title, poster_path, release_date, overview, character } = obj;
                    setRoles(prev => [...prev, { id, title, poster_path, release_date, overview, character }]);
                });
            });

    }, [params]);

    function handleMouseEnter(e) {
        if (e.target.children[0] !== undefined)
            e.target.children[0].classList.add('radio__submenu--active');
    }

    return (
        <>
            <Header />
            <div className="person-detail">
                <div className="person-detail__personal-info">
                    <img
                        className="person-detail__image"
                        src={`${props.image_url}${detail.profile_path}`}
                        alt="" />
                </div>
                <div className="person-detail__carrier">
                    <h1 className="person-detail__carrier__name">{detail.name}</h1>
                    <h3 className="person-detail__carrier__sub-heading">Biography</h3>
                    <p className="person-detail__carrier__biography">{detail.biography}</p>
                    <h3 className="person-detail__carrier__sub-heading">
                        Known For
                    </h3>
                    <div className="person-detail__carrier__known-for__container">
                        {
                            role.map(({ title, id: key, poster_path: backdrop_path, overview, release_date }) => {
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
                    </div>
                    <h3 className="person-detail__carrier__sub-heading">
                        Acting
                    </h3>
                    <div className="person-detail__carrier__acting">
                        {
                            role.map(({ id, title, poster_path, release_date, overview, character }) => {
                                return (
                                    <Link key={id} to={`/movie/${id}`}>
                                        <div
                                            key={id}
                                            className="person-detail__carrier__acting__row">
                                            <p className="person-detail__carrier__acting__row__year">{release_date}</p>
                                            <div
                                                type="radio"
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={(e) => {
                                                    if (e.target.children.length >= 1)
                                                        e.target.children[0].classList.remove('radio__submenu--active')
                                                }}
                                                className="person-detail__carrier__acting__row__radio">
                                                <div
                                                    onMouseLeave={(e) => e.target.classList.remove('radio__submenu--active')}
                                                    className="radio__submenu">
                                                    <img
                                                        src={`${props.image_url}${poster_path}`}
                                                        alt="Movie Poster"
                                                        className="radio__submenu__image" />
                                                    <div className="radio__submenu__detail">
                                                        <h2 className="radio__submenu__detail__name">{title}</h2>
                                                        <p className="radio__submenu__detail__overview">{overview}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="person-detail__carrier__acting__row__name"><b>{title}</b></p>
                                            <p className="person-detail__carrier__acting__row__as">as</p>
                                            <p className="person-detail__carrier__acting__row__character"><b>{character}</b></p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default PersonDetail;