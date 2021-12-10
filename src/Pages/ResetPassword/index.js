import React, { useState } from "react";
import styles from '../ForgotPassword/ForgotPassword.module.scss';

import { useParams, useHistory } from 'react-router-dom'
import ValidateInput from '../../Utils/ValidateInput';
import userApi from '../../Api/userApi';

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

    const submitHandler = e => {
        e.preventDefault();
        if (error.error === '' && error.password === '' && error.confirmPassword === '') {
            console.log('RESET PASSWORD');
            userApi.resetPassword({ token, password: resetPass.password })
                .then(res => res.data)
                .then(data => {
                    if (data.status) {
                        history.push('/dang-nhap')
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div className={styles["container"]}>


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
                                    setResetPass({ ...resetPass, confirmPassWord: e.target.value })
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