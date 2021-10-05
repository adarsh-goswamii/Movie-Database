import React, {useState} from 'react';
import Header from '../Components/Header';
import Poster from '../Components/Poster';
import Trailer from '../Components/Trailer';
import Movie from '../Components/Movie';
import Trending from '../Components/Trending';
import Footer from '../Components/Footer';
import Player from '../Components/Player';

const Homepage= (props)=> {
    const [url, setUrl] = useState("");
    const [playState, setPlayState] = useState("not visible");
    function playVideo(link, state) {
        link = `https://www.youtube.com/embed/${link}`;
        setUrl(link);
        setPlayState(state);
    }

    return (
        <>
            <Player
                url= {url}
                playState={playState}
                setPlayState={setPlayState}/>
                
            <div className={playState == 'visible' ? "wrapper--hidden" : "wrapper"}>
                <Header />
                <Poster api_key={props.api_key} image_url={props.image_url} />
                <Movie 
                    api_key={props.api_key} 
                    image_url={props.image_url}/>
                <Trailer
                    api_key={props.api_key}
                    play_video={playVideo}
                    image_url={props.image_url} />

                <Trending 
                    api_key={props.api_key}
                    image_url={props.image_url}/>
                <Footer />
            </div>
        </>
    );
}

export default Homepage;