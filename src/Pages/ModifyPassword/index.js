import React, { Component, useState } from 'react';
import { useSelector } from 'react-redux';
import NotLoggedIn from '../../Components/NotLoggedIn';

import UserMenu from '../../Components/UserMenu';
import styles from '../ModifyPassword/ModifyPassword.module.scss';

import ValidateInput from '../../Utils/ValidateInput';
import userApi from '../../Api/userApi';


import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function ModifyPassword() {
    const { loggedIn, user } = useSelector(state => state.User);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        type: '',
    })
    const [password, setPassword] = useState({
        old: '',
        new: '',
        confirmNew: '',
    });

    const [error, setError] = useState({
        old: '',
        new: '',
        confirmNew: '',
    })

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setPassword({
            ...password,
            [name]: value,
        })
    }
    const handleBlur = (e) => {
        const { name, value } = e.target;
        let err = ValidateInput['password'](value)
        if (err === '' && name === 'confirmNew' && value != password.new) {
            err = 'Xác nhận không trùng khớp.'
        }
        setError({
            ...error,
            [name]: err,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password.confirmNew != password.new) {
            let err = 'Xác nhận không trùng khớp.'
            setError({
                ...error,
                confirmNew: err,
            })
            return ;
    
        }

        const data = {
            oldPassword: password.old,
            newPassword: password.new,
        }

        const res = await userApi.changePassword(data);
        if (res.success) {
            setNotification({
                open: true,
                message: 'Đổi mật khẩu thành công !',
                type: 'success',
            });
            setPassword({
                old: '',
                new: '',
                confirmNew: '',
            })
        } else {
            setNotification({
                open: true,
                message: res.message,
                type: 'error',
            });
        }
    }

    const handleClose = () => {
        setNotification({
            ...notification,
            open: false,
        })
    }

    return user && loggedIn ? (
        <div className={[styles['ModifyPassWordContainer-container'], styles['auth']].join(' ')}>
            <UserMenu user={user} />
            <Snackbar 
                anchorOrigin={{vertical: 'top',horizontal: 'right'}}
                open={notification.open} 
                autoHideDuration={4000} 
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={notification.type} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
            <div className={styles['ModifyPassWordContainer-container-format']}>
                <h1 className={styles['ModifyPassWordContainer-container-tile']}>Đổi Mật Khẩu</h1>
                <div className={styles['ModifyPassWordContainer-Father']}>
                    <div className={styles['ModifyPassWordContainer-child']}>
                        <form action='#' className={styles['ModifyPassWordContainer-form']} >
                            <div className={styles['ModifyPassWord-user-details']}>
                                <div className={styles['ModifyPassWord-input-box']}>
                                    <lable className={styles['ModifyPassWord-input-box-details']}>Mật khẩu cũ:</lable>
                                    <input name='old' className={styles['ModifyPassWord-register-input']} type='password'
                                        value={password.old}
                                        onChange={handleOnChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                </div>
                                <div className={styles['error']}>{error.old}</div>

                                <div className={styles['ModifyPassWord-input-box']}>
                                    <lable className={styles['ModifyPassWord-input-box-details']}>Mật khẩu mới:</lable>
                                    <input name='new' className={styles['ModifyPassWord-register-input']} type='password'
                                        value={password.new}
                                        required
                                        onChange={handleOnChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div className={styles['error']}>{error.new}</div>

                                <div className={styles['ModifyPassWord-input-box']}>
                                    <lable className={styles['ModifyPassWord-input-box-details']}>Nhập lại mật khẩu:</lable>
                                    <input name='confirmNew' className={styles['ModifyPassWord-register-input']} type='password'
                                        value={password.confirmNew}
                                        required
                                        onChange={handleOnChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <div className={styles['error']}>{error.confirmNew}</div>
                            </div>
                            <div className={styles['ModifyPassWord-button']}>
                                <div className={styles['ModifyPassWord-cancel']}>
                                    <input className={styles['ModifyPassWord-button-cancel']} type='submit' value='Hủy' />
                                </div>
                                <div className={styles['ModifyPassWord-confirm']}>
                                    <input className={styles['ModifyPassWord-button-confirm']} type='submit' value='Xác nhận'
                                        onClick={handleSubmit}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    ) : <NotLoggedIn />
}

export default ModifyPassword;