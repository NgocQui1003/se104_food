import React from 'react'
import '../styles/header_user.scss';
import abc from'../styles/anhdaidien.jpg';

function HeaderUser() {
    return (
        <div className='HeaderUserContainer'>
            <div className="header-logo"></div>
            <ul className="header-menu-user">
                <li>
                    <a className="" to="#">Random món ăn</a>
                </li>
                <li>
                    <a className="" to="#">Dọn tủ lạnh</a>
                </li>
            </ul>
            <div class="header-searchbar-user">
                <input type="search" placeholder="Tìm kiếm công thức" />
            </div>
            <div className="img-header-user">
                <img className="img-header-user-img" src={abc} />
                <span className="img-header-user-img-span">Nguyen Ngoc Qui</span>
            </div>
            
        </div>
    )
}

export default HeaderUser
