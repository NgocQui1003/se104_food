
import React, { useEffect, useState } from 'react'
import styles from './ForgotPassword.module.scss';
import ValidateInput from '../../Utils/ValidateInput';
import { useHistory } from 'react-router-dom';
import userApi from '../../Api/userApi';

import Notification from '../../Components/Notification';
function ForgotPassword() {
    const history = useHistory();
    useEffect(() => {
        document.title = "Quên mật khẩu"
    })
    const [email, setEmail] = useState('')

    const [error, setError] = useState({
        email: '',
    })

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

    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await userApi.forgotPassword({ email })

        const message = res.message;
        const type = (res.success) ? 'success' : 'error';

        setNoti({
            open: true,
            type,
            message,
        })

    }
    return (
        <div className={styles['container']}>

            <Notification noti={noti} handleCloseNoti={handleCloseNoti} />
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
