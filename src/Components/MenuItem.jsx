import React, { useState } from 'react';
import '../CSS/MenuItem.css';
import { Link } from 'react-router-dom';

const MenuItem = (props) => {
    const [state, setState] = useState("");
    function toggleActive(event) {
        event.target.classList.toggle("menuitem__submenu--active");
        if (state === "") setState("menuitem__submenu--active");
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
                    props.submenu.map(({ name, link }) => {
                        return (
                            <Link to={`${link}`}>
                                <p
                                    className="menuitem__submenu__item"
                                    key={name}>
                                    {name}
                                </p>
                            </Link>
                        );
                    })
                }
            </div>
        </div >
    );
}

export default MenuItem;