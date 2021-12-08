import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';


function Footer() {
    return (
        <div className={styles["body"]}>
            <footer className={styles["footer-distributed"]}>
                <div className={styles["footer-left"]}>
                    <h3>Nom Nom</h3>
                    <p className={styles["footer-links"]}>
                        <Link to="/" className={styles["link-1"]}>Trang chủ</Link>
                        <Link to="/don-tu-lanh">Dọn tủ lạnh</Link>
                        <Link to="#">Danh sách món ăn</Link>
                        <Link to="/random-mon-an">Random món ăn</Link>
                    </p>
                    <p className={styles["footer-company-name"]}>nomnom©2021</p>
                </div>
                <div className={styles["footer-center"]}>
                    <div>
                        <i className={styles["fa fa-map-marker"]} />
                        <p><span>1 Đường Hàn Thuyên</span> Quận Thủ Đức, TP HCM</p>
                    </div>
                    <div>
                        <i className={styles["fa fa-phone"]} />
                        <p>+84.13456789</p>
                    </div>
                    <div>
                        <i className={styles["fa fa-envelope"]} />
                        <p><Link to="mailto:support@abc.com">support@abc.com</Link></p>
                    </div>
                </div>
                <div className={styles["footer-right"]}>
                    <p className={styles["footer-company-about"]}>
                        <span>Về chúng tôi</span>
                        Muốn ăn thì lăn vào bếp cùng nomnom
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;