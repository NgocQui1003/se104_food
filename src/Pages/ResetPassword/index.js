import React, { useEffect, useState } from "react";
import styles from './ResetPassword.module.scss';

import { useParams, useHistory } from 'react-router-dom'
import ValidateInput from '../../Utils/ValidateInput';
import userApi from '../../Api/userApi';
import Notification from '../../Components/Notification';

function ResetPass() {
    const history = useHistory();
    const { token } = useParams();
    const [resetPass, setResetPass] = useState({
        password: '',
        confirmPassword: '',
    })

    const [error, setError] = useState({
        error: '',
        password: '',
        confirmPassword: ''
    })

    const submitHandler = async e => {
        e.preventDefault();
        if (error.error === '' && error.password === '' && error.confirmPassword === '') {
            console.log('RESET PASSWORD');
            const dataPassword = {
                newPass: resetPass.password,
                confirmPass: resetPass.confirmPassword,
            }
            const res = await userApi.resetPassword({ token, data: dataPassword })

            console.log(res);
            const type = (res.success) ? 'success' : 'error';
            const message = res.message;
            setNoti({
                open: true,
                type,
                message,
            })

            if (res.success) {
                setTimeout(() => history.push('/dang-nhap'), 3000);
            }
        }
    }


    const [noti, setNoti] = useState({
        open: false,
        type: 'error',
        message: '',
    })
    const handleCloseNoti = () => {
        setNoti({
            ...noti,
            open: false,
        })
    }

    useEffect(() => {
        document.title = 'Đặt lại mật khẩu | Nom Nom'
    })
    return (
        <div className={styles["container"]}>
            <Notification noti={noti} handleCloseNoti={handleCloseNoti} />

            <form onSubmit={submitHandler} className={styles['login-form']} >
                <h2>Đặt lại mật khẩu</h2>

                <div>
                    <div className={styles['form-input']}>
                        <label className={styles['']}>
                            Mật khẩu mới:
                        </label>
                        <input type='password'
                            className={styles["textbox"]}
                            onChange={(e) => {
                                setResetPass({ ...resetPass, password: e.target.value })
                            }}
                            onBlur={(e) => {
                                let err = ValidateInput.password(e.target.value);
                                setError({ ...error, password: err })
                            }}
                            required />
                    </div>
                    {(error.password == '') ? null :
                        <div className={styles['text-danger']}>{error.password}</div>}
                    <div className={styles['form-input']}>
                        <label className={styles['']}>
                            Nhập lại mật khẩu mới:
                        </label>
                        <input type='password'
                            className={styles["textbox"]}
                            onChange={(e) => {
                                setResetPass({ ...resetPass, confirmPassword: e.target.value })
                                if (e.target.value.length >= resetPass.password.length) {
                                    let err = ValidateInput.validateConfPassWord(e.target.value, resetPass.password);
                                    setError({ ...error, confirmPassword: err })
                                }
                            }}
                            onBlur={(e) => {
                                let err = ValidateInput.validateConfPassWord(e.target.value, resetPass.password);
                                setError({ ...error, confirmPassword: err })
                            }}
                            required />
                    </div>
                    {(error.confirmPassword == '') ? null :
                        <div className={styles['text-danger']}>{error.confirmPassword}</div>}
                </div>
                <button type="submit" className={styles['submit-btn']}>Gửi</button>


            </form>
        </div>
    )
}
export default ResetPass