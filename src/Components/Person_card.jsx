import React from 'react';
import '../CSS/Person_card.css';

const PersonCard = (props) => {
    return (
        <div
            style={{ backgroundImage: `url(${props.image_url})` }}
            className="person-card"
            key={props.id}>
            <div className="person-card__info">
                {props.children}
            </div>
        </div>
    );
}

export default PersonCard;