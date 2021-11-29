import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../AdminMenu/AdminMenu.module.scss';
import logo from '../../Assets/100x100.png';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditIcon from '@mui/icons-material/Edit';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

// import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

function AdminMenu() {

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
                    <NavLink to="/xoa-nguoi-dung" className={styles['menu-item__link']} activeClassName={styles['picked']}>
                        <div className={styles['menu-item__icon']}>
                            <PersonOutlineIcon />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Xóa người dùng
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

export default AdminMenu;