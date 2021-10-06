import React, {useEffect} from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Trailer_card from './Trailer_card';
import '../CSS/Slider.css';

const Slider = (props) => {
    let slider_container, btn_prev;
    useEffect(()=> {
        slider_container= document.querySelector(`#slider${props.for}__container`);
        btn_prev= document.querySelector(`#slider${props.for}__prev`);
    }, [props.children]);

    function next() {
        if(slider_container=== null || slider_container=== undefined) return;
        let card_width= slider_container.children[0].offsetWidth;
        let skip= card_width;
        let mod= slider_container.offsetWidth- skip*2;
        let val= slider_container.style.transform;
        let prev_value= val=== ''? 0: val.substring(val.indexOf('(')+1, val.length-3);
        slider_container.style.transform= `translateX(${(parseInt(prev_value)- skip)%mod}px)`;

        let translatex= (parseInt(prev_value)- skip)%mod;
        if(translatex=== 0) btn_prev.classList.add(`slider__prev--hidden`);
        else btn_prev.classList.remove(`slider__prev--hidden`);
    } 

    function prev() {
        if(slider_container=== null || slider_container=== undefined) return;
        let card_width= slider_container.children[0].offsetWidth;
        let skip= card_width;
        let mod= slider_container.offsetWidth- skip*2;
        let val= slider_container.style.transform;
        let prev_value= val=== ''? 0: val.substring(val.indexOf('(')+1, val.length-3);
        // console.log(prev_value);
        let final= (parseInt(prev_value)+ skip)%mod;
        slider_container.style.transform= `translateX(${final>0? 0: final}px)`;

        let translatex= final;
        if(translatex=== 0) btn_prev.classList.add(`slider__prev--hidden`);
        else btn_prev.classList.remove(`slider__prev--hidden`);
    }

    return (
        <div className={`slider`}>
            <div 
                className={`slider__prev slider__prev--hidden`}
                id={`slider${props.for}__prev`}
                onClick={prev}>
                <NavigateBeforeIcon />
            </div>
            <div 
                className={`slider__container`} 
                id={`slider${props.for}__container`}>
                {props.children}
            </div>
            <div 
                className={`slider__next`}
                onClick={next}>
                <NavigateNextIcon />
            </div>
        </div>
    );
};

export default Slider;