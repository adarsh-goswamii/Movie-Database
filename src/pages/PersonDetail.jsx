import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Movie_card from '../Components/Movie_card';
import '../CSS/PersonDetail.css';

const PersonDetail = (props) => {
    let params = useParams();
    let [known_for, setKnownFor] = useState([]);
    let [role, setRoles] = useState([]);

    useEffect(() => {

        // fetch(`https://api.themoviedb.org/3/person/${params.personId}?api_key=${props.api_key}&language=en-US`)
        //     .then(data => data.json())
        //     .then(obj=> {
        //         // let {}
        //     });

        // fetch(`https://api.themoviedb.org/3/person/${params.personId}/movie_credits?api_key=${props.api_key}&language=en-US`)
        //     .then(data => data.json())
        //     .then(({ cast, crew }) => {
        //         cast.map(obj => {
        //             let { id, title, poster_path, release_date, overview, character } = obj;
        //             setRoles(prev => [...prev, { id, title, poster_path, release_date, overview, character }]);
        //         });
        //         crew.map(obj => {
        //             let { id, title, poster_path, release_date, overview, job: character } = obj;
        //             setRoles(prev => [...prev, { id, title, poster_path, release_date, overview, character }]);
        //         });
        //     });

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
                        className="personal-info__image"
                        src=""
                        alt="" />
                </div>
                <div className="person-detail__carrier">
                    <h1 className="person-detail__carrier__name">Jason Statham</h1>
                    <h3 className="person-detail__carrier__sub-heading">Biography</h3>
                    <p className="person-detail__carrier__biography">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem ullam deleniti, officia iure minus voluptatum asperiores maiores doloribus reprehenderit sint fuga odit, delectus minima molestias similique in repellendus accusamus magni?
                        Cumque quia eaque inventore numquam error ad, temporibus beatae mollitia molestiae commodi, ex natus aliquam nostrum ipsum quidem aspernatur reprehenderit quod, blanditiis enim tempore fugiat. Labore, facilis. Beatae, reiciendis labore?</p>
                    <h3 className="person-detail__carrier__sub-heading">
                        Known For
                    </h3>
                    <div className="person-detail__carrier__known-for__container">
                        {
                            known_for.map(({ title, id: key, poster_path: backdrop_path, overview, release_date }) => {
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
                        <div className="person-detail__carrier__acting__row">
                            <p className="person-detail__carrier__acting__row__year">2023</p>
                            <div
                                type="radio"
                                onMouseEnter={handleMouseEnter}
                                className="person-detail__carrier__acting__row__radio">
                                <div
                                    onMouseLeave={(e) => e.target.classList.remove('radio__submenu--active')}
                                    className="radio__submenu">

                                </div>
                            </div>
                            <p className="person-detail__carrier__acting__row__name"><b>Movie Name</b></p>
                            <p className="person-detail__carrier__acting__row__as">as</p>
                            <p className="person-detail__carrier__acting__row__character"><b>Character</b></p>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default PersonDetail;