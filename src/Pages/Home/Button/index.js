import React from 'react'

import styles from './Button.module.scss';
function Button( props ) {
    const { keyBtn, title, active, onClick } = props;

    return (
        <button className={`${styles['container']} ${active ? styles['active'] : ''}`}
            onClick={() => onClick(keyBtn)}
        >
            {title}
        </button>
    )
}

export default Button
