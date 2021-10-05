import React, {useState} from 'react';
import '../Components/Components_css/MenuItem.css';

const MenuItem= (props)=> {
    const[state, setState]= useState("");
    function toggleActive(event) {
        event.target.classList.toggle("menuitem__submenu--active");
        if(state=== "") setState("menuitem__submenu--active");
        else setState("");
    }

    function trigger(e) {
        e.target.classList.remove("menuitem__submenu--active");
    }

    return (
        <div className="menuitem" >
            <div onClick={toggleActive} className="menuitem__title">
            {props.title}
            </div>
            <div 
                onMouseLeave={trigger}
                className={`menuitem__submenu ${state}`}>
            {
                props.submenu.map((i)=> {
                    return (
                        // TODO: Add link tags according to the provided item.
                        <p 
                            className="menuitem__submenu__item"
                            key={i}>
                        {i}
                        </p>
                    );
                })
            }
            </div>
        </div>
    );
}

export default MenuItem;