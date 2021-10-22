import React, { useState } from "react";
import { Link } from "react-router-dom";
import './HeaderHomepage.scss';

function Navbar() {
    const [click, setClick] = useState(false);
    const [navbar, setNavbar] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    // window.addEventListener('scroll', changeBackground);

    return (
        <>
            <nav className={navbar ? 'navbar active' : 'navbar'}>
                <div className='navbar-container'>
                    <div className='navbar-col'>
                        <ul className='nav-menu'>
                            <li className='nav-item'>
                                <Link to='/tim-kiem-cong-thuc' className='nav-links' onClick={closeMobileMenu}>
                                    Tìm kiếm công thức
                                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/lien-he' className='nav-links' onClick={closeMobileMenu}>
                                    Liên hệ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='navbar-col'>
                        <Link to='/' className='navbar-logo'>
                            LOGO
                        </Link>
                    </div>

                    <div className='navbar-col'>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <div className={click ? 'nav-item-remove' : 'nav-item-remove active'}>
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

                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;