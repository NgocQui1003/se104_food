import React from 'react';
import styles from './Footer.module.scss';
function Footer() {
    return (
        <div className={styles["main"]}>
            <footer className={styles["footer-distributed"]}>
                <div className={styles["footer-left"]}>
                    <h3>Company<span>logo</span></h3>
                    <p className={styles["footer-links"]}>
                        <a className={styles["link-1"]} href="#">Trang chủ</a>
                        <a href="#">Tìm kiếm món ăn</a>
                        <a href="#">Danh sách món ăn</a>
                        <a href="#">Random</a>

                    </p>
                    <p className={styles["footer-company-name"]} >abc©2021</p>
                </div>
                <div className={styles["footer-center"]}>
                    <div>
                        <i className={styles["fa fa-map-marker"]}></i>
                        <p><span>1 Đường Hàn Thuyên</span> Quận Thủ Đức, TP HCM</p>
                    </div>
                    <div>
                        <i className={styles["fa fa-phone"]}></i>
                        <p>+84.13456789</p>
                    </div>
                    <div>
                        <i className={styles["fa fa-envelope"]}></i>
                        <p><a href="mailto:support@abc.com">support@abc.com</a></p>
                    </div>
                </div>
                <div className={styles["footer-right"]}>
                    <p className={styles["footer-company-about"]}>
                        <span>Về chúng tôi</span>
                        Muốn ăn thì lăn vào bếp cùng abc
                    </p>
                </div>
            </footer>
        </div>
    )
}
export default Footer;