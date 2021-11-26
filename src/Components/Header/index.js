import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';

import logo from "../../Assets/100x100.png";

function Navbar() {
    const [click, setClick] = useState(false);
    const [navbar, setNavbar] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    // const changeBackground = () => {
    //     if (window.scrollY >= 80) {
    //         setNavbar(true);
    //     } else {
    //         setNavbar(false);
    //     }
    // }

    // // window.addEventListener('scroll', changeBackground);

    return (
        <>
            <nav className={navbar ? [styles['navbar'], styles['active']].join(' ') : styles['navbar']}>
                <div className={styles['navbar-container']}>
                    <div className={styles['navbar-col']}>
                        <Link to='/' className='navbar-logo'>
                            <img src={logo} />
                        </Link>
                    </div>
                    <div className={styles['navbar-col']}>
                        <ul className={styles['nav-menu']}>
                            <li className={styles['nav-item']}>
                                <Link to='/tim-kiem-cong-thuc' className={styles['nav-links']} onClick={closeMobileMenu}>
                                    Tìm kiếm công thức
                                </Link>
                            </li>
                            <li className={styles['nav-item']}>
                                <Link to='/lien-he' className={styles['nav-links']} onClick={closeMobileMenu}>
                                    Liên hệ
                                </Link>
                            </li>
                            <li className={styles['nav-item']}>
                                <input type="search" className={styles['nav-searchbar']} placeholder="Tìm kiếm công thức" />
                            </li>
                        </ul>
                    </div>

                    <div className={styles['navbar-col']}>
                        <ul className={click ? [styles['nav-menu'], styles['active']].join(' ') : styles['nav-menu']}>
                            <div className={click ? styles['nav-item-remove'] : [styles['nav-item-remove'], styles['active']].join(' ')}>
                                <li className={styles['nav-item']}>
                                    <Link to='/random-mon-an' className={styles['nav-links']} onClick={closeMobileMenu}>
                                        Random món ăn
                                    </Link>
                                </li>
                                <li className={styles['nav-item']}>
                                    <Link to='/tim-kiem-cong-thuc' className={styles['nav-links']} onClick={closeMobileMenu}>
                                        Tìm kiếm công thức
                                    </Link>
                                </li>
                                <li className={styles['nav-item']}>
                                    <Link to='/don-tu-lanh' className={styles['nav-links']} onClick={closeMobileMenu}>
                                        Dọn tủ lạnh
                                    </Link>
                                </li>
                                <li className={styles['nav-item']}>
                                    <Link to='/lien-he' className={styles['nav-links']} onClick={closeMobileMenu}>
                                        Liên hệ
                                    </Link>
                                </li>
                            </div>
                            <li className={styles['nav-item']}>
                                <Link to='/dang-nhap' className={styles['nav-links-mobile']} onClick={closeMobileMenu}>
                                    Đăng nhập
                                </Link>
                            </li>
                            <li className={styles['nav-item']}>
                                <Link to='/dang-ki' className={styles['nav-links-mobile']} onClick={closeMobileMenu}>
                                    Đăng kí
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles['menu-icon']} onClick={handleClick}>
                        {click ? <CancelIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;