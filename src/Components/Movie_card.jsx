import React from 'react';
import './Components_css/Movie_card.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';

const Movie_card = ({image_url, overview, id, movie_name, release_date}) => {

    let month= ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year= release_date.substring(0, 4), mon= release_date.substring(5, 7), date= release_date.substring(8, 10);
    release_date= `${date} ${month[parseInt(mon)]}, ${year}`;

    return (
        <div className="movie-card" key={id}>
            <div className="movie-card__container-shell">
                <div className="movie-card__container">
                    <div className="movie-card__container__front">
                        <img
                            className="movie-card__container__front__img"
                            src={image_url}
                            alt="Movie picture" />
                    </div>
                    <div className="movie-card__container__back">
                        <h3 className="movie-card__container__back__heading">{movie_name}</h3>
                        <p className={"movie-card__container__back__date"}>{release_date}</p>
                        <p className={"movie-card__container__back__overview"}>{overview}</p>
                        <div className="movie-card__container__back__icons">
                            <div className="movie-card__container__back__icons__fav"><FavoriteIcon/></div> 
                            <div className="movie-card__container__back__icons__bookmark"><BookmarkIcon/></div> 
                            <div className="movie-card__container__back__icons__star"><StarIcon/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie_card;