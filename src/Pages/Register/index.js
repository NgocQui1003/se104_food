import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from "./Register.module.scss";
import ValidateInput from '../../Utils/ValidateInput';
import ThirdPartyFacebook from '../../Components/ThirdPartyFacebook';
import ThirdPartyGoogle from '../../Components/ThirdPartyGoogle';

import userApi from '../../Api/userApi';
import { userActions } from '../../Redux/Actions/userActions';
import Auth from '../../Utils/Auth';
import LogoutToUse from '../../Components/LogoutToUse';


function Register() {
    const history = useHistory();
    const dispatch = useDispatch()

    const { loggedIn, user } = useSelector(state => state.User);

    useEffect(() => {
        document.title = "Đăng kí tài khoản - Nomnom"
    })

    const [registerValue, setRegisterValue] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        email: '',
        password: '',
        register: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterValue({
            ...registerValue,
            [name]: value
        });

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await userApi.register(registerValue);

        if (data.success) {
            Auth.setToken(data.accessToken);
            const res = await userApi.getProfile();
            dispatch(userActions.setProfile(res.data));
            history.push('/')
            window.location.reload(true);
        } else {
            setError({ ...error, register: data.message });
            if (data.message === "Email exist") {
                alert("Đăng kí thất bại. Email đã tồn tại.");
            } else {
                alert("Đăng kí thất bại.")
            }
        }
    }

    return loggedIn && user ? (
        <LogoutToUse />
    ) : (
        <div>
            <form className={styles['register-form']} onSubmit={handleSubmit} >
                <h2>ĐĂNG KÍ</h2>
                <div className={styles["form-input"]}>
                    <div>
                        <label for="lastname" className={styles["label-input"]}>
                            Họ:
                        </label>
                        <input type="text" className={styles["register-input"]}
                            name="lastname"
                            value={registerValue.lastname}
                            onChange={handleChange}
                            onBlur={(e) => {
                                let error = ValidateInput.userLastName(e.target.value);
                                setError({
                                    ...error,
                                    lastname: error
                                });
                            }} />
                    </div>
                    <br />
                    {error.lastname == '' ? null :
                        <div className={styles['form-error']}>{error.lastname}</div>
                    }
                    <div>
                        <label for="firstname" className={styles["label-input"]}>
                            Tên:
                        </label>
                        <input type="text" className={styles["register-input"]}
                            name="firstname"
                            value={registerValue.firstname}
                            onChange={handleChange}
                            onBlur={(e) => {
                                let error = ValidateInput.userFirstName(e.target.value);
                                setError({
                                    ...error,
                                    firstname: error
                                });
                            }} />
                    </div>
                </div>
                {error.firstname == '' ? null :
                    <div className={styles['form-error']}>{error.firstname}</div>
                }
                <div className={styles["form-input"]}>
                    <label for="gender" className={styles["label-input"]}>
                        Giới tính:
                    </label>
                    <div className={styles['form-radio-input']}>
                        <label className={styles["label-input"]} for="gender">
                            Nam
                            <input type="radio" value="Nam"
                                name="gender"
                                id="gender-1"
                                onChange={handleChange} />
                        </label>
                        <label className={styles["label-input"]} for="gender">
                            Nữ
                            <input type="radio" value="Nữ"
                                name="gender"
                                id="gender-0"
                                onChange={handleChange} />
                        </label>
                    </div>
                </div>
                <div className={styles["form-input"]}>
                    <label for="email" className={styles["label-input"]}>
                        Email:
                    </label>
                    <input type="email" className={styles["register-input"]}
                        name="email"
                        value={registerValue.email}
                        onChange={handleChange}
                        onBlur={(e) => {
                            let error = ValidateInput.email(e.target.value);
                            setError({
                                ...error,
                                email: error
                            });
                        }} />
                </div>
                {error.email == '' ? null :
                    <div className={styles['form-error']}>{error.email}</div>
                }
                <div className={styles["form-input"]}>
                    <label for="password" className={styles["label-input"]}>
                        Mật khẩu:
                    </label>
                    <input type="password" className={styles["register-input"]}
                        name="password"
                        value={registerValue.password}
                        onChange={handleChange}
                        onBlur={(e) => {
                            let error = ValidateInput.password(e.target.value);
                            setError({
                                ...error,
                                password: error
                            });
                        }} />
                </div>
                {error.password == '' ? null :
                    <div className={styles['form-error']}>{error.password}</div>
                }
                <div className={styles["form-via"]}>
                    <Link to="/quen-mat-khau" className={styles["form-link"]}>Quên mật khẩu</Link>
                    <Link to='dang-nhap' className={styles["form-link"]}>Đăng nhập</Link>
                </div>
                <br />
                <div className={styles["form-submit"]}>
                    <button type="submit" value="" className={styles["submit-btn"]}>Đăng kí</button>
                </div>
            </form>


            <p className={styles.center}>Hoặc</p>
            <div className={styles["thirdparty-login"]}>
                <ThirdPartyFacebook />
                <ThirdPartyGoogle />
            </div>

        </div >
    );
}

export default Register;