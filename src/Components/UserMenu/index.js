import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                    <Link to="/nguoi-dung" className={styles['menu-item__link']}>
                        <div className={styles['menu-item__icon']}>
                            <PersonOutlineIcon fontSize="medium" />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Thông tin người dùng
                        </div>
                    </Link>
                </li>
                <li className={styles['menu-item']}>
                    <Link to="/doi-mat-khau" className={styles['menu-item__link']}>
                        <div className={styles['menu-item__icon']}>
                            <ShieldOutlinedIcon fontSize="medium" />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Đổi mật khẩu
                        </div>
                    </Link>
                </li>
                <li className={[styles['menu-item'], styles['picked']].join(' ')}>
                    <Link to="/luu" className={styles['menu-item__link']}>
                        <div className={styles['menu-item__icon']}>
                            <BookmarkOutlinedIcon fontSize="medium" />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Bài viết đã lưu
                        </div>
                    </Link>
                </li>
                <li className={styles['menu-item']}>
                    <Link to="/cai-dat" className={styles['menu-item__link']}>
                        <div className={styles['menu-item__icon']}>
                            <SettingsOutlinedIcon fontSize="medium" />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Cài đặt
                        </div>
                    </Link>
                </li>
            </ul>

            <div className={styles["menu-btn"]}>
                <button className={styles["menu-btn__logout"]}>Đăng xuất</button>
            </div>
        </div>
    )
}

export default UserMenu;