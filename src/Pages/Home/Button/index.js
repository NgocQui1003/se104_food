import React from 'react'

import styles from './Button.module.scss';
function Button( props ) {
    const { title, active } = props;
    return (
        <button className={`${styles['container']} ${active ? styles['active'] : ''}`}>
            {title}
        </button>
    )
}

export default Button
