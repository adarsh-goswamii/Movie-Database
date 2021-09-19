import React, {useState} from 'react';
import '../Components/Components_css/MenuItem.css';

const MenuItem= (props)=> {
    const[state, setState]= useState("");
    function toggleActive(event) {
        event.target.classList.toggle("menuitem__submenu--active");
        if(state== "") setState("menuitem__submenu--active");
        else setState("");
    }

    return (
        <div className="menuitem" onClick={toggleActive}>
            <div className="menuitem__title">
            {props.title}
            </div>
            <div className={`menuitem__submenu ${state}`}>
            {
                props.submenu.map((i)=> {
                    return (
                        // TODO: Add link tags according to the provided item.
                        <p className="menuitem__submenu__item">
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