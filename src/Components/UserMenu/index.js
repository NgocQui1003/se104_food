import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from '../UserMenu/UserMenu.module.scss';
import logo from '../../Assets/100x100.png';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditIcon from '@mui/icons-material/Edit';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
// import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

// Redux
import { userActions } from '../../Redux/Actions/userActions';

// Api
import userApi from '../../Api/userApi';


function UserMenu({ user }) {
    const dispatch = useDispatch()
    const history = useHistory();

    const logout = () => {
        userApi.logout();
        dispatch(userActions.logout());
        history.push('/')
    }

    const AvatarUser = () => (
        <>
            <div className={styles['user-avatar']}>
                <img
                    src={user.avatar}
                    alt='avatar-user'
                ></img>

            </div>
            <div className={styles['user-name']}>
                {user.firstname} {user.lastname}
            </div>
        </>
    )

    return (
        <div className={styles['user-menu']}>
            <AvatarUser></AvatarUser>
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
                    <NavLink to="/doi-thong-tin" className={styles['menu-item__link']} activeClassName={styles['picked']}>
                        <div className={styles['menu-item__icon']}>
                            <EditIcon />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Đổi thông tin người dùng
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
                    <NavLink to="/danh-sach-bai-dang" className={styles['menu-item__link']} activeClassName={styles['picked']}>
                        <div className={styles['menu-item__icon']}>
                            <ListAltIcon />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Danh sách bài đăng
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
                <button className={styles["menu-btn__logout"]} onClick={logout}>Đăng xuất</button>
            </div>
        </div>
    )
}

export default UserMenu;