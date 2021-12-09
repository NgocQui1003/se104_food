// Create User including Admin
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import styles from './CreateUser.module.scss';

// Components
import NotLoggedIn from '../../Components/NotLoggedIn';

import ValidateInput from '../../Utils/ValidateInput';

// import userApi from '../../Api/userApi';
import adminApi from '../../Api/adminApi';
import { userActions } from '../../Redux/Actions/userActions';
import Auth from '../../Utils/Auth';
import AdminMenu from '../../Components/AdminMenu';

function CreateUser() {
    const { user, loggedIn } = useSelector(state => state.User);
    const history = useHistory();
    const dispatch = useDispatch();
    let isAdmin;
    if (user) {
        if (user.role && user.role.role_name === 'admin') {
            isAdmin = true;
        }
    } else {
        isAdmin = false;
    }

    useEffect(() => {
        document.title = "Admin Đăng kí - Nomnom"
    })

    const [registerValue, setRegisterValue] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        role: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        role: '',
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
        const data = await adminApi.createAccount(registerValue);
        console.log("sâu nhỏ: ", data);
        if (data.success) {
            alert('Đăng kí thành công!');
            window.location.reload(true);
        } else {
            setError({ ...error, register: data.message });
            if (data.message === "Email exist") {
                alert("Đăng kí thất bại. Email đã tồn tại.");
            } else {
                alert("Đăng kí thất bại. ");
            }
        }
    }

    return user && loggedIn && isAdmin ? (
        <div className={styles['container']}>
            <AdminMenu user={user}></AdminMenu>
            <div className={styles['container-register']}>

                <form className={styles['register-form']} onSubmit={handleSubmit}>
                    <h1 className={styles['container-title']}>
                        ĐĂNG KÍ ADMIN
                    </h1>
                    <div className={styles["form-input"]}>
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
                    {error.lastname == '' ? null :
                        <div className={styles['form-error']}>{error.lastname}</div>
                    }
                    <div className={styles['form-input']}>
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

                    <div className={styles['form-input']}>
                        <label className={styles['label-input']} for="role">
                            Quyền:
                        </label>
                        <div className={styles['form-radio-input']}>
                            <label className={styles['label-input']} for='role'>
                                User
                                <input type='radio' value='user'
                                    name='role'
                                    id='role-0'
                                    onChange={handleChange} />
                            </label>
                        </div>
                        <div className={styles['form-radio-input']}>
                            <label className={styles['label-input']} for='role'>
                                Admin
                                <input type='radio' value='admin'
                                    name='role'
                                    id='role-0'
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
                        <div className={styles['form-error']}>{error.register}</div>
                    }

                    <div className={styles["form-submit"]}>
                        <button type="submit" value="" className={styles["submit-btn"]}>Đăng kí</button>
                    </div>

                </form>
            </div >
        </div >
    ) : <NotLoggedIn />
}

export default CreateUser;