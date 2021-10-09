import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Movie_card from '../Components/Movie_card';
import '../CSS/Search.css';


const Search= (props)=> {
    const [render, setRender]= useState(false); 
    const [explore, setExplore]= useState({
        keyword: null,
        sort: 'popularity.desc', 
        year: NaN, 
        peopleId: NaN, 
        genre: []
    });
    const [data, setData]= useState([{id: 580489, poster_path: '/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg', title: 'Venom: Let There Be Carnage', release_date: '2021-09-30', overview: 'After finding a host body in investigative reporte…ge, the alter ego of serial killer Cletus Kasady.'}
    ,{id: 550988, poster_path: '/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg', title: 'Free Guy', release_date: '2021-08-11', overview: 'A bank teller called Guy realizes he is a backgrou… game called Free City that will soon go offline.'}
    , {id: 335983, poster_path: '/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg', title: 'Venom', release_date: '2018-09-28', overview: 'Investigative journalist Eddie Brock attempts a co…organization looking for a symbiote of their own.'}
    ,{id: 568620, poster_path: '/uIXF0sQGXOxQhbaEaKOi2VYlIL0.jpg', title: 'Snake Eyes: G.I. Joe Origins', release_date: '2021-07-22', overview: 'After saving the life of their heir apparent, tena…t means losing the trust of those closest to him.'}
    ,{id: 703771, poster_path: '/vFIHbiy55smzi50RmF8LQjmpGcx.jpg', title: 'Deathstroke: Knights & Dragons - The Movie', release_date: '2020-08-04', overview: 'The assassin Deathstroke tries to save his family …m the wrath of H.I.V.E. and the murderous Jackal.'}
    ,{id: 681887, poster_path: '/6Wm7P6y22UZA40QuPYHyWyJ6leI.jpg', title: 'Cosmic Sin', release_date: '2021-03-12', overview: "In the year 2524, four centuries after humans star…to stop the imminent attack before it's too late."}
    ,{id: 637534, poster_path: '/nLanxl7Xhfbd5s8FxPy8jWZw4rv.jpg', title: 'The Stronghold', release_date: '2021-08-18', overview: 'A police brigade working in the dangerous northern… of crime is higher than anywhere else in France.'}
    ,{id: 589754, poster_path: '/5VJSIAhSn4qUsg5nOj4MhQhF5wQ.jpg', title: 'The Last Warrior: Root of Evil', release_date: '2021-01-01', overview: 'Peace and tranquility have set in Belogorie. The e…eat the enemies and to return peace to Belogorie.'}
    ,{id: 839436, poster_path: '/6WcJ4cV2Y3gnTYp5zHu968TYmTJ.jpg', title: 'Dragon Fury', release_date: '2021-06-15', overview: 'A group of soldiers are taken to the mountains of Wales to investigate a strange beast.'}
    ,{id: 566525, poster_path: '/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg', title: 'Shang-Chi and the Legend of the Ten Rings', release_date: '2021-09-01', overview: 'Shang-Chi must confront the past he thought he lef…the web of the mysterious Ten Rings organization.'}
    ,{id: 725273, poster_path: '/ApwmbrMlsuOay5rXQA4Kbz7qJAl.jpg', title: 'Solitary', release_date: '2021-09-24', overview: "A man wakes up inside a room to discover he's a pr…mate Alana is hell bent on destroying everything."}
    ,{id: 436969, poster_path: '/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg', title: 'The Suicide Squad', release_date: '2021-07-28', overview: 'Supervillains Harley Quinn, Bloodsport, Peacemaker…he remote, enemy-infused island of Corto Maltese.'}
    ,{id: 451048, poster_path: '/9dKCd55IuTT5QRs989m9Qlb7d2B.jpg', title: 'Jungle Cruise', release_date: '2021-07-28', overview: 'Dr. Lily Houghton enlists the aid of wisecracking …iscovery that will change the future of medicine.'}
    ,{id: 859041, poster_path: '/jVAEVDNdUPRKJ7hJ4zt6lGcLATD.jpg', title: 'Crazy Fist', release_date: '2017-05-25', overview: 'After an opponent dies mid-match, a prominent MMA …s, he has no choice but to step back in the ring.'}
    ,{id: 639721, poster_path: '/xYLBgw7dHyEqmcrSk2Sq3asuSq5.jpg', title: 'The Addams Family 2', release_date: '2021-10-01', overview: 'The Addams get tangled up in more wacky adventures…un-ins with all sorts of unsuspecting characters.'}
    ,{id: 385128, poster_path: '/bOFaAXmWWXC3Rbv4u4uM9ZSzRXP.jpg', title: 'F9', release_date: '2021-05-19', overview: "Dominic Toretto and his crew battle the most skill…r they've ever encountered: his forsaken brother."}
    ,{id: 631843, poster_path: '/vclShucpUmPhdAOmKgf3B3Z4POD.jpg', title: 'Old', release_date: '2021-07-21', overview: 'A group of families on a tropical holiday discover… – reducing their entire lives into a single day.'}
    ,{id: 588921, poster_path: '/l8HyObVj8fPrzacAPtGWWLDhcfh.jpg', title: 'Ainbo: Spirit of the Amazon', release_date: '2021-02-09', overview: 'An epic journey of a young hero and her Spirit Gui… their home in the spectacular Amazon Rainforest.'}
    ,{id: 859860, poster_path: '/qKxrBZ8Ts4KHZKp7BT6GAVMLFO2.jpg', title: 'Catch the Bullet', release_date: '2021-09-10', overview: 'U.S. marshal Britt MacMasters returns from a missi…rously close to the Red Desert’s Sioux territory.'}
    ,{id: 459151, poster_path: '/uWStkK8bq9ixY3fc7y209ZleCoF.jpg', title: 'The Boss Baby: Family Business', release_date: '2021-07-01', overview: 'The Templeton brothers — Tim and his Boss Baby lit…gether again … and inspire a new family business.'}]);  

    useEffect(()=> {
        if(explore.keyword!= null) {
            // * do search using just keyword
        
        } else {
            // * use all other aspects to filter out except keyword

        }

    }, [render]);

    function updateKeyword(e) {
        explore.keyword= e.target.value;
        console.log(e.target.value);
    }

    return (
        <>
            <Header/>
            <div className="explore">
                <div className="explore__criteria">
                </div>
                <div className="explore__data">
                {
                    data.map(({ title, id: key, poster_path: backdrop_path, overview, release_date }) => {
                        return (
                            <div
                                key={key}
                                className="search__container__card">
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
                <div className="explore__search-btn">
                    Search
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Search;