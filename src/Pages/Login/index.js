import React, { useState } from 'react'
import styles from './Login.module.scss';

import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ValidateInput from '../../Utils/ValidateInput';
import Auth from '../../Utils/Auth';

import userApi from '../../Api/userApi';

import FacebookLogin from '../../Components/FacebookLogin';
import GoogleLogin from '../../Components/GoogleLogin';

import { userActions } from '../../Redux/Actions/userActions';

function Login() {
    const dispatch = useDispatch()
    const history = useHistory();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState({
        email: '',
        password: '',
        login: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginData({
            ...loginData,
            [name]: value,
        })
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (name === 'password') return ;
        let err = ValidateInput[name](value)
        setError({
            ...error,
            [name]: err,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await userApi.login(loginData);
        if (data.success) {
            Auth.setToken(data.accessToken)
            const res = await userApi.getProfile();
            dispatch(userActions.setProfile(res.data))
            history.goBack()
        } else {
            setError({...error, login: data.message})
        }
    }
    return (
        <div className={styles['container']}>
            <form onSubmit={handleSubmit} className={styles['login-form']}>
                <h2>ĐĂNG NHẬP</h2> 
                <div>
                    <div className={styles['form-input']}>
                        <label for='email' className={styles['']}>
                            Email:
                        </label>
                        <input type='email' className={styles['']}
                            name='email'
                            value={loginData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className={styles['text-danger']}>{error.email}</div>

                    <div className={styles['form-input']}>
                        <label for='password' className={styles['']}>
                            Mật khẩu:
                        </label>
                        <input type='password' className={styles['']}
                            name='password'
                            value={loginData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className={styles['text-danger']}>{error.password}</div>

                </div>

                <div className={styles['text-danger']}>{error.login}</div>

                <div className={styles["form-via"]}>
                    <Link to="/quen-mat-khau" className={styles["form-link"]}>Quên mật khẩu</Link>
                    <Link to='/dang-ki' className={styles["form-link"]}>Đăng kí</Link>
                </div>
                <button type="submit" className={styles['submit-btn']}>Đăng nhập</button>
            </form>
            <p>Hoặc</p>
            <FacebookLogin />
            <GoogleLogin />
        </div>
    )
}

export default Login;
