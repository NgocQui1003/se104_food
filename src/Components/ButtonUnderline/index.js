import React from 'react'

import styles from './ButtonUnderline.module.scss';
function ButtonUnderline( props ) {
    const { keyBtn, title, active, onClick} = props;
    return (
        <button className={`${styles['container']} ${active ? styles['active'] : ''}`}
            onClick={() => onClick(keyBtn)}
        >
            {title}
        </button>
    )
}

export default ButtonUnderline
