import React, { useState, useSelector } from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../AdminMenu/AdminMenu.module.scss';
import logo from '../../Assets/100x100.png';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

// import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

// components
import NotLoggedIn from '../NotLoggedIn';

function AdminMenu({ user }) {
    // const { user, loggedIn } = useSelector(state => state.User);

    return (
        <div className={styles['user-menu']}>
            <div className={styles['user-avatar']}>
                <img src={user.avatar} />
            </div>
            <div className={styles['user-name']}>
                {user.lastname} {user.firstname}
            </div>
            <ul className={styles['menu-list']}>
                <li className={styles['menu-item']}>
                    <NavLink to="/admin/xoa-nguoi-dung" className={styles['menu-item__link']} activeClassName={styles['picked']}>
                        <div className={styles['menu-item__icon']}>
                            <PersonOutlineIcon />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Danh sách người dùng
                        </div>
                    </NavLink>
                    <NavLink to='/admin/tao-account' className={styles['menu-item__link']} activeClassName={styles['picked']}>
                        <div className={styles['menu-item__icon']}>
                            <PersonAddIcon />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Thêm người dùng mới
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