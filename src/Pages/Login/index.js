import React, { useState } from 'react'
import styles from './Login.module.scss';

import { Link } from 'react-router-dom';
import ValidateInput from '../../Utils/ValidateInput';
import userApi from '../../Api/userApi';
import FacebookLogin from '../../Components/FacebookLogin';
import GoogleLogin from '../../Components/GoogleLogin';

function Login() {
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

        await userApi.login(loginData)
            .then((res) => {
                // Thuong thi xu ly chinh o day
                console.log(res);
            })
            .catch((err) => {
                // Thuong thi loi o server
                console.log(err);
            })

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
