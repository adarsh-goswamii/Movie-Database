import React, {useState, useEffect} from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './Components_css/Trailer_card.css';

const Trailer_card= (props)=> {
    const [img, setImg]= useState('');
    useEffect(()=> setImg(props.image_url), []);

    // Object.keys(props.link.video_path).map((i)=> {
    //     console.log("key= ", i);
    // });

    return (
        <div 
        key= {props.id}
        className="trailer-card"
        link={props.link}
        onClick={()=> props.play_video(props.link, "visible")}
        style={{backgroundImage: `url(${img})`}}>
            <PlayArrowIcon className="trailer-card__play"/>
        </div>
    );
};

export default Trailer_card;