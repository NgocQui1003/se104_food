import React from 'react'
import styles from './Home.module.scss';

function Home() {
    return (
        <div className={styles['container']}>
            <div className={styles['block-2']}>
                <button>Hôm nay ăn gì?</button>
                <span>hoặc</span>
                <span>dọn tủ lạnh nhà bạn bằng cách nhập nguyên liệu còn thừa dưới đây</span>
                <input placeholder="Cà chua, trứng"/>
            </div>
        </div>
    )
}

export default Home;
