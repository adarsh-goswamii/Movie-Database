import React, { useState } from 'react';
import styles from '../CSS/Toggle.module.css';

const Toggle = (props) => {
    // console.log(props.click);

    return (
        <div className={styles.toggle} id={props.id}>
            <label className={styles.toggle__label} htmlFor={`checkbox ${props.id}`}>
            <input
                type="checkbox"
                className={styles.toggle__label__checkbox}
                onClick={props.click}
                id={`checkbox ${props.id}`} />
                <span className={styles.toggle__label__span}>
                    <h3 className={styles.toggle__label__span__option1}>
                        {props.options[0]}
                    </h3>
                    <h3 className={styles.toggle__label__span__option2}>
                        {props.options[1]}
                    </h3>
                </span>
            </label>
        </div>
    );
}

export default Toggle;