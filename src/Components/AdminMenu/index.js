import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../AdminMenu/AdminMenu.module.scss';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

// components
// import NotLoggedIn from '../NotLoggedIn';

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
                    <NavLink to='/admin/ho-so' className={styles['menu-item__link']} activeClassName={styles['picked']}>
                        <div className={styles['menu-item__icon']}>
                            <PersonOutlineIcon />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Thông tin Admin
                        </div>
                    </NavLink>
                    <NavLink to="/admin/danh-sach-nguoi-dung" className={styles['menu-item__link']} activeClassName={styles['picked']}>
                        <div className={styles['menu-item__icon']}>
                            <ListAltIcon />
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
                    <NavLink to='/admin/danh-sach-bai-viet' className={styles['menu-item__link']} activeClassName={styles['picked']}>
                        <div className={styles['menu-item__icon']}>
                            <FormatListBulletedIcon />
                        </div>
                        <div className={styles['menu-item__name']}>
                            Danh sách bài viết
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