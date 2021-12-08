
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
        await userApi.forgotPassword({email})
            .then(res => res.data)
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err))

    }
    return (
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
                                        let err = ValidateInput.email(e.target.value);
                                        setError({ ...error, email: err })
                                    }
                                }
                                value={email}
                                required
                            />
                        </td>
                    </tr>

                    {(error.email == '') ? null :
                        <tr>
                            <td colspan="2" className={styles["center"]}>
                                {error.email}
                            </td>
                        </tr>
                    }

                    <tr height="50">
                        <td colspan="2" className={styles["center"]}>
                            <input name="button" type="submit" className={styles["button"]} />
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    )
}

export default ForgotPassword;
