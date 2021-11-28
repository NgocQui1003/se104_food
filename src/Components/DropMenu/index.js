import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './DropMenu.module.scss';

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SettingsIcon from '@mui/icons-material/Settings';

import userApi from '../../Api/userApi';
import { userActions } from '../../Redux/Actions/userActions';
import { useDispatch } from 'react-redux';

function DropMenu(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        userApi.logout();
        dispatch(userActions.logout());
        history.push('/');
    }

    return (props.trigger) ? (
        <div className={styles['drop-menu']}>
            <div className={styles['menu-content']}>
                <div className={styles['menu-content-items']}>
                    <PersonOutlineIcon fontSize="small" />
                    <Link to='/nguoi-dung'>
                        Tài khoản
                    </Link>
                </div>
                <div className={styles['menu-content-items']}>
                    <BookmarkBorderIcon fontSize="small" />
                    <Link to='/luu' >
                        Bài viết đã lưu
                    </Link>
                </div>
                <div className={styles['menu-content-items']}>
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
    ) : null
}

export default DropMenu;