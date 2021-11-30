import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./HeaderHomepage.module.scss";
import { useDispatch } from 'react-redux';

import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';

import logo from "../../Assets/100x100.png";
import { userActions } from '../../Redux/Actions/userActions';
import userApi from '../../Api/userApi';
import DropMenu from "../DropMenu";

function Navbar({ loggedIn, user }) {
    const dispatch = useDispatch()
    const history = useHistory();

    const [click, setClick] = useState(false);
    const [navbar, setNavbar] = useState(false);

    const [menuTrigger, setMenuTrigger] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const AvatarUser = () => (
        <div className={styles['container-avatar']}>
            <img
                src={user.avatar}
                alt='avatar-user'
            ></img>
            <span>{user.firstname}</span>
        </div>
    )

    const logout = () => {
        userApi.logout();
        dispatch(userActions.logout());
        closeMobileMenu()
        history.push('/')
    }

    return user && loggedIn
        ? (
            <div className={styles['container']}>
                <nav className={navbar ? [styles['navbar'], styles['active']].join(' ') : styles['navbar']}>
                    <div className={styles['navbar-container']}>
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
                            </ul>
                        </div>

                        <div className={styles['navbar-col']}>
                            <Link to='/' className='navbar-logo'>
                                <img src={logo} alt='logo' />
                            </Link>
                        </div>

                        <div className={styles['navbar-col']}>
                            <ul className={click ? [styles['nav-menu'], styles['active']].join(' ') : styles['nav-menu']}>
                                <div className={click ? styles['nav-item-remove'] : [styles['nav-item-remove'], styles['active']].join(' ')}>
                                    <li className={styles['nav-item']}>
                                        <p className={styles['nav-links']}>
                                            Xin chào, {user.firstname}.
                                        </p>
                                    </li>

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
                                <li className={`${styles['nav-item']} ${styles['login-success']}`}>
                                    <Link to='/dang-bai-viet' className={styles['nav-links-mobile']} onClick={closeMobileMenu}>
                                        Đăng bài viết
                                    </Link>
                                </li>
                                <li className={`${styles['nav-item']} ${styles['login-success']}`} onClick={() => setMenuTrigger(!menuTrigger)}>
                                    {/* <a onClick={() => setMenuTrigger(true)} className={styles['nav-links-mobile']} onClick={closeMobileMenu}>

                                    </a> */}
                                    <AvatarUser></AvatarUser>
                                </li>
                                <DropMenu trigger={menuTrigger} setMenuTrigger={setMenuTrigger}></DropMenu>
                                <li className={`${styles['nav-item']} ${styles['logout']}`}>
                                    <div className={styles['nav-links-mobile']} onClick={logout}>
                                        Đăng xuất
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className={styles['menu-icon']} onClick={handleClick}>
                            {click ? <CancelIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
                        </div>
                    </div>
                </nav>
            </div>
        )
        : (
            <>
                <nav className={navbar ? [styles['navbar'], styles['active']].join(' ') : styles['navbar']}>
                    <div className={styles['navbar-container']}>
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
                            </ul>
                        </div>

                        <div className={styles['navbar-col']}>
                            <Link to='/' className='navbar-logo'>
                                <img src={logo} alt='logo' />
                            </Link>
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