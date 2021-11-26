import React, { useEffect, useState } from 'react'
import styles from './Login.module.scss';

import ValidateInput from '../../Utils/ValidateInput';
import userApi from '../../Api/userApi';

function Login() {
    useEffect(() => {
        document.title = "Đăng nhập"
    })

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState({
        email: '',
        password: '',
        login: '',
    })

    const submitHandler = async (e) => {
        e.preventDefault();

        console.log(loginData);

        // Test Input
        // Opt 1
        console.log(ValidateInput.email(loginData.email));

        // Op1 2 (*)
        // 2 key phai giong nhau moi map dc nha
        // ko thi loi sml :)
        Object.keys(loginData).map((key) => {
            console.log(ValidateInput[key](loginData[key]));
        })


        // API
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
            <form onSubmit={submitHandler}>
                <h2>ĐĂNG NHẬP</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Email:</td>
                            <td>
                                <input
                                    type='email'
                                    placeholder='peo@gmail.com'
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <span className={styles['text-danger']}>{error.email}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Mật khẩu:</td>
                            <td>
                                <input
                                    type='password'
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <span className={styles['text-danger']}>{error.email}</span>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <div className={styles['error-login']}>{error.login}</div>
                <button type="submit" className={styles['btn-submit']}>Đăng nhập</button>
            </form>
        </div>
    )
}

export default Login;
