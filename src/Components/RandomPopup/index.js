import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './RandomPopup.module.scss';
import foodImg from '../../Assets/changangamsatac.jpg';
import logo from '../../Assets/100x100.png';

import CancelIcon from '@mui/icons-material/Cancel';

function RandomPopup(props) {

    return (props.trigger) ? (
        <div className={styles['popup-container']}>
            <div className={styles['popup-inner']}>
                <div className={styles['close-btn']}>
                    <CancelIcon onClick={() => props.setTrigger(false)} />
                </div>
                <div className={styles['random-title']}>
                    <Link to='/'>
                        Chân gà sả tắc
                    </Link>
                </div>
                <div className={styles['random-image']}>
                    <Link to="/">
                        <img src={foodImg} />
                    </Link>
                </div>
                <div className={styles['random-author']}>
                    <span className={styles['bold']}>Người nấu: </span>@ndklien
                </div>
                <div className={styles['random-description']}>
                    Chân gà ngâm sả tắc là món ăn vặt rất thích hợp để nhâm nhi cùng bạn bè và gia đình.
                    Bài viết dưới đây sẽ cùng vào bếp hướng dẫn bạn 3 cách làm chân gà sả tắc ngon giòn hấp dẫn,
                    thấm vị cực đã tại nhà nhé!
                </div>
            </div>
        </div>
    ) : null
}

export default RandomPopup;