import React, { useState } from 'react'
import styles from './Home.module.scss';

import RandomPopup from '../../Components/RandomPopup';

function Home() {

    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <div className={styles['container']}>
            <div className={styles['block-2']}>
                <button onClick={() => setButtonPopup(true)}>Hôm nay ăn gì?</button>
                <RandomPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
                </RandomPopup>
                <span>hoặc</span>
                <span>dọn tủ lạnh nhà bạn bằng cách nhập nguyên liệu còn thừa dưới đây</span>
                <input placeholder="Cà chua, trứng" />
            </div>
        </div>
    )
}

export default Home;
