import React, { Component, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import styles from '../UserMenu/UserMenu.module.scss';
import logo from '../../Assets/100x100.png';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

function UserMenu() {

    return (
        <div className={styles['user-menu']}>
            <div className={styles['user-avatar']}>
                <img src={logo} />
            </div>
            <div className={styles['user-name']}>
                Nguyễn Văn A
            </div>
            <ul className={styles['menu-list']}>
                <li className={styles['menu-item']}>
                    <NavLink to="/nguoi-dung" className={styles['menu-item__link']} activeClassName={styles['picked']}>
                        <div className={styles['menu-item__icon']}>
                            <PersonOutlineIcon />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Thông tin người dùng
                        </div>
                    </NavLink>
                </li>
                <li className={styles['menu-item']}>
                    <NavLink to="/doi-mat-khau" className={styles['menu-item__link']} activeClassName={styles['picked']}>
                        <div className={styles['menu-item__icon']}>
                            <ShieldOutlinedIcon />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Đổi mật khẩu
                        </div>
                    </NavLink>
                </li>
                <li className={styles['menu-item']}>
                    <NavLink to="/luu" className={styles['menu-item__link']} activeClassName={styles['picked']}>
                        <div className={styles['menu-item__icon']}>
                            <BookmarkBorderOutlinedIcon />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Bài viết đã lưu
                        </div>
                    </NavLink>
                </li>
                <li className={styles['menu-item']}>
                    <NavLink to="/cai-dat" className={styles['menu-item__link']} activeClassName={styles['picked']}>
                        <div className={styles['menu-item__icon']}>
                            <SettingsOutlinedIcon />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Cài đặt
                        </div>
                    </NavLink>
                </li>
            </ul>
            <div className={styles["menu-btn"]}>
                <button className={styles["menu-btn__logout"]}>Đăng xuất</button>
            </div>
        </div>
    )
}

export default UserMenu;