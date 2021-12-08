import React from 'react';

import styles from './NotLoggedIn.module.scss';

import loggedin_img from '../../Assets/loggedInErr.JPG';

function NotLoggedIn() {
    return (
        <div className={styles['container']}>
            <div className={styles['error-title']}>
                TÍNH NĂNG CẦN ĐĂNG NHẬP
            </div>
            <div className={styles['error-img']}>
                <img src={loggedin_img} alt='You_need_to_login.jpg' />
            </div>
            <div className={styles['error-description']}>
                Bạn cần đăng nhập để có thể sử dụng tính năng này
            </div>
        </div>
    )
}

export default NotLoggedIn;