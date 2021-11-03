import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import { style } from '@mui/system';

import logo from "../../Assets/100x100.png";

function Header() {

    const [click, setClick] = useState(false);
    const handleClick = () => {
        setClick(!click);
    }

    const closeMobileMenu = () => {
        setClick(false);
    };

    return (
        <header>
            <div className={styles["header-container"]}>
                <div className={styles["header-columns"]}>
                    <Link to="/" className={styles["header-logo"]}>
                        <img src={logo} />
                    </Link>
                </div>
                <div className={styles["header-columns"]}>
                    <ul className={styles["header-menu"]}>
                        <li className={styles["menu-items"]}>
                            <Link to="/random-mon-an">
                                Random món ăn
                            </Link>
                        </li>
                        <li>
                            <Link to="/don-tu-lanh">
                                Dọn tủ lạnh
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles["header-columns"]}>
                    <div className={styles["header-searchbar"]}>
                        <input type="search" placeholder="Tìm kiếm công thức" />
                    </div>
                </div>
                <div className={styles['header-columns']}>
                    <ul className={click ? [styles['header-menu'], styles['active']].join(' ') : styles['header-menu']}>
                        <div className={click ? styles['header-item-remove'] : [styles['header-item-remove'], styles['active']].join(' ')}>
                            <li className='nav-item'>
                                <Link to='/random-mon-an' className='nav-links' onClick={closeMobileMenu}>
                                    Random món ăn
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/tim-kiem-cong-thuc' className='nav-links' onClick={closeMobileMenu}>
                                    Tìm kiếm công thức
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/don-tu-lanh' className='nav-links' onClick={closeMobileMenu}>
                                    Dọn tủ lạnh
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/lien-he' className='nav-links' onClick={closeMobileMenu}>
                                    Liên hệ
                                </Link>
                            </li>
                        </div>

                        <li className='nav-item'>
                            <Link to='/dang-nhap' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Đăng nhập
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/dang-ki' className='nav-links-mobile' onClick={closeMobileMenu}>
                                Đăng kí
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles['menu-btn']} onClick={handleClick}>
                    {click ? <CancelIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
                </div>
            </div>
        </header>
    );
}

export default Header;