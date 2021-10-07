import React from 'react';
import '../CSS/ProgressBar.css';

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <svg className="progress-bar__wrapper">
                <circle
                    className="progress-bar__inner-circle"
                    cx='25'
                    cy='25'
                    r='20'>
                </circle>
                <circle
                    style={{ strokeDashoffset: `${128 - (128 * props.percentage) / 100}` }}
                    className="progress-bar__outer-circle"
                    cx='25'
                    cy='25'
                    r='20'></circle>
            </svg>
            <p className="progress-bar__percentage">{props.percentage}%</p>
        </div>
    );
}

export default ProgressBar;