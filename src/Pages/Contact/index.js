import React, { useEffect } from 'react';

import styles from './Contact.module.scss';
import logo from '../../Assets/100x100.png';

// icon import
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

function Contact() {

    useEffect(() => {
        document.title = 'Liên hệ với Nomnom';
    })
    return (
        <div className={styles['container']}>
            <div className={styles['about-us']}>
                <h1>VỀ CHÚNG TÔI</h1>
                <div className={styles['about-us__content']}>
                    <p>Bạn không biết mai ăn gì? Bạn khổ sở vì chọn món trưa/tối nay?</p>
                    <p>Đừng lo, vì đã có</p>
                    <Link to="/">
                        <img className={styles['about-us__logo']} src={logo} />
                    </Link>
                    <div>
                        .
                        .
                        .
                    </div>
                    <p>Một nhóm sanh viên xà quần để xong đồ án</p>
                </div>
            </div>
            <div className={styles['contact']}>
                <h1>LIÊN HỆ</h1>
                <div className={styles['contact__content']}>
                    <p><span className={styles['content-bold']}>Số điện thoại: </span>0909.999.999</p>
                    <p><span className={styles['content-bold']}>Địa chỉ: </span> Số 1 Hàn (T)Huyên, TP. Thủ Đức</p>
                    <p><span className={styles['content-bold']}>Email: </span>info@nomnom.com</p>
                    <div className={styles['content-via']}>
                        <p className={styles['content-bold']}>Liên hệ via</p>
                        <div className={styles['content-via__icon']}>
                            <a href="https://www.facebook.com/">
                                <FacebookIcon />
                            </a>
                        </div>
                        <div className={styles['content-via__icon']}>
                            <a href="https://www.instagram.com/">
                                <InstagramIcon />
                            </a>
                        </div>
                        <div className={styles['content-via__icon']}>
                            <a href="https://twitter.com/">
                                <TwitterIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contact;