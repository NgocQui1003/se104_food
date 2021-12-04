import React, { useState } from "react";
import axios from 'axios';

import styles from './ForgotPassword.module.scss';
const localhost = 'http://localhost:3000/';
axios.defaults.withCredentials = true
function ForgotPassword() {
    const [email, setEmail] = useState('')

    const [error, setError] = useState({
        email: '',
    })
    const validateEmail = text => {
        const re = /\S+@\S+\.\S+/;
        if (text === ''){
            return 'Vui lòng điền email'
        }
        else {
            if (!re.test(text)) return 'Vui lòng nhập đúng định dạng Email';
        }
    
        return '';
    }
    const forgotFassword = async (email) => {
        const URL = localhost + `user/forgot-password`;
        return axios.post(URL, email)
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        await forgotFassword({email})
        .then(res => res.data)
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles['container']}>
        <div className={styles["forgotpass"]}>
            <h3>Quên mật khẩu</h3>

            <form onSubmit={submitHandler}>
                <table cellspacings="5">
                    <tr>
                        <td className={styles["user"]}>Email</td>
                        <td>
                            <input type="email"
                                className={styles["textbox"]}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={
                                    (e) => {
                                        let err = validateEmail(e.target.value);
                                        setError({ ...error, email: err })
                                    }
                                }
                                value={email}
                                required
                            />
                        </td>
                    </tr>
                    <tr height="50">
                        <td colspan="2" className={styles["center"]}>
                            <input name="button" type="submit" className={styles["button"]} />
                        </td>
                    </tr>
                </table>
            </form>
        </div>

        </div>
    )
}
export default ForgotPassword;