import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './LogoutToUse.module.scss';
import img from '../../Assets/logoutToUse.JPG';

import { userActions } from '../../Redux/Actions/userActions';
import userApi from '../../Api/userApi';

function LogoutToUse() {
    const dispatch = useDispatch()
    const history = useHistory();

    const logout = () => {
        userApi.logout();
        dispatch(userActions.logout());
        history.push('/')
    }
    return (
        <div className={styles['container']}>
            <div className={styles['logout-container__img']}>
                <img src={img} alt="nomnom website 404 logout img" />
            </div>
            <div className={styles['logout-container__noti']}>
                VUI LÒNG ĐĂNG XUẤT ĐỂ SỬ DỤNG CHỨC NĂNG NÀY
            </div>
            <div className={styles['logout-container__description']}>
                Ấn vào nút dưới đây để đăng xuất
            </div>
            <div className={styles['menu-btn']}>
                <button className={styles['menu-btn__logout']} onClick={logout}>
                    Đăng xuất
                </button>
            </div>
        </div>
    )
}

export default LogoutToUse;