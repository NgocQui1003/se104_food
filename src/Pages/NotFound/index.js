import React from 'react';

import styles from './NotFound.module.scss';
import img from '../../Assets/404_notfound.JPG';

function NotFound() {
    return (
        <div className={styles['container']}>
            <div className={styles['not-found-container__img']}>
                <img src={img} alt="nomnom website 404 not found img" />
            </div>
            <div className={styles['not-found-container__noti']}>
                404 NOT FOUND
            </div>
            <div className={styles['not-found-container__description']}>
                Xin lỗi, đường dẫn bạn đang cố truy cập không tồn tại
            </div>
        </div>
    )
}

export default NotFound;