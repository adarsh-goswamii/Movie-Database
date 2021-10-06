import React, {useState} from 'react';
import '../CSS/Player.css';

const Player = (props) => {
    function handleClick(e) {
        let target = e.target;
        if (target != null && target.classList.contains("play-video--active")) {
            props.setPlayState("not visible");
            // ! Stop the youtube player.
        }
    }

    return (
        <div
            onClick={handleClick}
            className={props.playState == 'visible' ? `play-video--active` : "play-video"}>
            <iframe
                className="play-video__player"
                width="560"
                height="315"
                src={`${props.url}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
        </div>
    );
}

export default Player;