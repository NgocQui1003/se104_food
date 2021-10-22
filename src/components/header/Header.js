import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';

import './Header.scss';

function Header() {
    return (
        <header className="headerNormal">
            <div className="header-logo"></div>
            <ul className="header-menu">
                <li>
                    <Link className="" to="/random">Random món ăn</Link>
                </li>
                <li>
                    <Link className="" to="/don-tu-lanh">Dọn tủ lạnh</Link>
                </li>
            </ul>
            <div class="header-searchbar">
                <input type="search" placeholder="Tìm kiếm công thức" />
            </div>
            <ul className="header-auth">
                <li>
                    <Link className="" to="/dang-nhap">Đăng nhập</Link>
                </li>
                <li>
                    <Link className="" to="/dang-ki">Đăng kí</Link>
                </li>
            </ul>

            {/* <p>This is our header</p> */}
        </header>
    )
}

export default Header;