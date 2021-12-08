import React, { useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './DropMenu.module.scss';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import userApi from '../../Api/userApi';
import { userActions } from '../../Redux/Actions/userActions';
import { useDispatch } from 'react-redux';

function DropMenu(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const dropdownRef = useRef(null);
    const isAdmin = 'admin' === props.role;

    const logout = () => {
        userApi.logout();
        dispatch(userActions.logout());
        history.push('/');
    }

    useEffect(() => {
        const pageClickEvent = (e) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                props.setMenuTrigger(!props.trigger);
            }
        };
        // If the item is active (ie open) then listen for clicks
        if (props.trigger) {
            window.addEventListener('click', pageClickEvent);
        }

        return () => {
            window.removeEventListener('click', pageClickEvent);
        }

    }, [props.trigger]);

    return (props.trigger) ? (
        <>
            {isAdmin ? (
                <div ref={dropdownRef} className={styles['drop-menu']}>
                    <div className={styles['menu-content']}>
                        <div className={styles['menu-content-items']} >
                            <AdminPanelSettingsIcon fontSize="small" />
                            <Link to='/admin/ho-so'>
                                Admin
                            </Link>
                        </div>
                        <div className={styles['menu-content-items']} >
                            <PersonOutlineIcon fontSize="small" />
                            <Link to='/nguoi-dung'>
                                Tài khoản
                            </Link>
                        </div>
                        <div className={styles['menu-content-items']} >
                            <BookmarkBorderIcon fontSize="small" />
                            <Link to='/luu' >
                                Bài viết đã lưu
                            </Link>
                        </div>
                        <div className={styles['menu-content-items']} >
                            <SettingsIcon fontSize='small' />
                            <Link to='/cai-dat' >
                                Cài đặt
                            </Link>
                        </div>
                        <div className={styles['menu-content-authItem']}>
                            <a onClick={logout}>
                                Đăng xuất
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div ref={dropdownRef} className={styles['drop-menu']}>
                    <div className={styles['menu-content']}>
                        <div className={styles['menu-content-items']} >
                            <PersonOutlineIcon fontSize="small" />
                            <Link to='/nguoi-dung'>
                                Tài khoản
                            </Link>
                        </div>
                        <div className={styles['menu-content-items']} >
                            <BookmarkBorderIcon fontSize="small" />
                            <Link to='/luu' >
                                Bài viết đã lưu
                            </Link>
                        </div>
                        <div className={styles['menu-content-items']} >
                            <SettingsIcon fontSize='small' />
                            <Link to='/cai-dat' >
                                Cài đặt
                            </Link>
                        </div>
                        <div className={styles['menu-content-authItem']}>
                            <a onClick={logout}>
                                Đăng xuất
                            </a>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    ) : null
}

export default DropMenu;