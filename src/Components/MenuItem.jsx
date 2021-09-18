import React from 'react';
import '../Components/Components_css/MenuItem.css';

const MenuItem= (props)=> {
    return (
        <div className="menuitem">
            <div className="menuitem__title">
            {props.title}
            </div>
            <div className="menuitem__submenu">
            {
                props.submenu.map((i)=> {
                    return (
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