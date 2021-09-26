import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Poster from './Components/Poster';
import Toggle from './Components/Toggle';
import Trailer_card from './Components/Trailer_card';
import './index.css';

const API_key = 'd370300724b5dd3d75a44a46e93256c2';
const image_url = 'https://image.tmdb.org/t/p/original/';
const Index = () => {
    const [playState, setPlayState] = useState("");
    const [url, setUrl] = useState("");
    function playVideo(link, state) {
        // link = "https://www.youtube.com/embed/jK2VROKKTSQ";
        setUrl(link);
        setPlayState(state);
    }

    return (
        <>
            <div className={playState == 'visible' ? `play-video--active` : "play-video"}>
                <iframe
                    className="play-video__player"
                    width="560"
                    height="315"
                    src={`${url}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
            </div>
            <div className={playState== 'visible'? "wrapper--hidden": "wrapper"}>
                <Header />
                <Poster api_key={API_key} image_url={image_url} />
                <Toggle options={["In Threatre", "Popular"]} />
                <Trailer_card play_video={playVideo} />
                <Footer />
            </div>
        </>
    );
}

ReactDOM.render(<Index />, document.querySelector('#root'));