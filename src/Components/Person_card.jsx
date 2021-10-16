import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Person_card.css';

const PersonCard = (props) => {
    return (
        <Link to={`/PersonDetail/${props.id}`}>
            <div
                style={{ backgroundImage: `url(${props.image_url})` }}
                className="person-card"
                key={props.id}>
                <div className="person-card__info">
                    {props.children}
                </div>
            </div>
        </Link>
    );
}

export default PersonCard;