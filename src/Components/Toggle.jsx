import React, { useState } from 'react';
import './Components_css/Toggle.css';

const Toggle = (props) => {

    return (
        <div class="toggle">
            <label className="toggle__label" htmlFor="checkbox">
            <input
                type="checkbox"
                className="toggle__label__checkbox"
                id="checkbox" />
                <span className="toggle__label__span">
                    <h3 className="toggle__label__span__option1">
                        {props.options[0]}
                    </h3>
                    <h3 className="toggle__label__span__option2">
                        {props.options[1]}
                    </h3>
                </span>
            </label>
        </div>
    );
}

export default Toggle;