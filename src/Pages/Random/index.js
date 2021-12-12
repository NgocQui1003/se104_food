import React, { useEffect, useState } from 'react';

import styles from './Random.module.scss';

import RandomPopup from '../../Components/RandomPopup';

function Random() {

    const [buttonPopup, setButtonPopup] = useState(false);

    useEffect(() => {
        document.title = 'Hôm nay ăn gì? | Nom Nom';
    })

    return (
        <div className={styles['container']}>
            <button onClick={() => setButtonPopup(true)} className={styles['random-btn']}>Hôm nay ăn gì?</button>
            <RandomPopup trigger={buttonPopup} setTrigger={setButtonPopup}></RandomPopup>
        </div>
    )
}

export default Random;