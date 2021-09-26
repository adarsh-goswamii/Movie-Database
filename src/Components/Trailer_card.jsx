import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './Components_css/Trailer_card.css';
/**
 * * props.image_url will contains: 
 * *    complete link of the image so add the image_url provided by index.js with the 
 * *    backdrop_path recieved from api call.
 */

let image_url= "https://wallpapercave.com/wp/wp2022711.jpg";
const Trailer_card= (props)=> {
    return (
        <div 
        className="trailer-card"
        onClick={()=> props.play_video("link", "visible")}
        style={{backgroundImage: `url(${image_url})`}}>
            <PlayArrowIcon className="trailer-card__play"/>
        </div>
    );
};

export default Trailer_card;