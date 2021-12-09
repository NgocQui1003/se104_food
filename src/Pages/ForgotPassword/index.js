
import React, { useEffect, useState } from 'react'
import styles from './ForgotPassword.module.scss';


import ValidateInput from '../../Utils/ValidateInput';

import userApi from '../../Api/userApi';

function ForgotPassword() {
    useEffect(() => {
        document.title = "Quên mật khẩu"
    })
    const [email, setEmail] = useState('')

    const [error, setError] = useState({
        email: '',
    })

    const submitHandler = async (e) => {
        e.preventDefault();
        await userApi.forgotPassword({ email })
            .then(res => res.data)
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err))
        // post forgot-password
    }
    return (
        <div className={styles['container']}>


            <form onSubmit={submitHandler} className={styles['login-form']}>
                <h2>Quên mật khẩu</h2>
                <div>
                    <div className={styles['form-input']}>
                        <label for='email' className={styles['']}>
                            Email:
                        </label>
                        <input type='email' className={styles['']}
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={
                                (e) => {
                                    let err = ValidateInput.email(e.target.value);
                                    setError({ ...error, email: err })
                                }
                            }
                            value={email}
                            required
                        />
                    </div>
                    {(error.email == '') ? null :
                        <div className={styles['text-danger']}>{error.email}</div>}
                </div>
                <button type="submit" className={styles['submit-btn']}>Gửi</button>

            </form>
        </div>
    )
}

export default ForgotPassword;
