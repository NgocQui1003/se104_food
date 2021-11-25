import React from 'react'

import styles from './ButtonUnderline.module.scss';
function ButtonUnderline( props ) {
    const { title, active } = props;
    return (
        <button className={`${styles['container']} ${active ? styles['active'] : ''}`}>
            {title}
        </button>
    )
}

export default ButtonUnderline
