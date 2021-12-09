import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import AdminMenu from '../../Components/AdminMenu';
import NotLoggedIn from '../../Components/NotLoggedIn';

import styles from './AdminProfile.module.scss';

function AdminProfile() {
    const { user, loggedIn } = useSelector(state => state.User);
    let isAdmin;
    if (user) {
        if (user.role && user.role.role_name === 'admin') {
            isAdmin = true;
        }
    } else {
        isAdmin = false;
    }

    return user && loggedIn && isAdmin ? (
        <div className={styles['container']}>
            <AdminMenu user={user} />
            <div className={styles['InformationUser-container-format']}>
                <h1 className={styles['InformationUser-container-tile']}>Thông tin Admin</h1>
                <div className={styles['InformationUser-container-img']}>
                    <img className={styles['InformationUser-container-img-thumbnail']} src={user.avatar} />
                </div>
                <div className={styles['InformationUser-container-form']}>
                    <form className={styles['InformationUser-form']}>
                        <div className={styles["InformationUser-form-input"]}>
                            <div>
                                <label for="lastname" className={styles["InformationUser-label-input"]}>
                                    Họ:
                                </label>
                                <input type="text" className={styles["InformationUser-register-input"]}
                                    name="lastname"
                                    value={user.lastname}
                                    readOnly
                                />
                            </div>
                            <br />
                            <div>
                                <label for="firstname" className={styles["InformationUser-label-input"]}>
                                    Tên:
                                </label>
                                <input type="text" className={styles["InformationUser-register-input"]}
                                    name="firstname"
                                    value={user.firstname}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className={styles["InformationUser-form-input"]}>
                            <label for="gender" className={styles["InformationUser-label-input"]}>
                                Giới tính:
                            </label>
                            <div className={styles['InformationUser-form-radio-input']}>
                                <label className={styles["InformationUser-label-input"]} for="gender">
                                    Nam
                                    <input type="radio" value="Nam"
                                        name="gender"
                                        id="gender-1"
                                        checked={user.gender.toLowerCase() == "nam"}
                                    />
                                </label>
                                <label className={styles["InformationUser-label-input"]} for="gender">
                                    Nữ
                                    <input type="radio" value="Nữ"
                                        name="gender"
                                        id="gender-0"
                                        checked={user.gender.toLowerCase() == "nữ"}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={styles["InformationUser-form-input"]}>
                            <label for="gender" className={styles["InformationUser-label-input"]}>
                                Quyền:
                            </label>
                            <div className={styles['InformationUser-form-radio-input']}>
                                <label className={styles["InformationUser-label-input"]} for="role">
                                    User
                                    <input type="radio" value="user"
                                        name="role"
                                        id="role-0"
                                        checked={user.role.role_name.toLowerCase() == "user"}
                                    />
                                </label>
                                <label className={styles["InformationUser-label-input"]} for="role">
                                    Admin
                                    <input type="radio" value="admin"
                                        name="role"
                                        id="role-1"
                                        checked={user.role.role_name.toLowerCase() == "admin"}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={styles["InformationUser-form-input"]}>
                            <label for="email" className={styles["InformationUser-label-input"]}>
                                Email:
                            </label>
                            <input type="email" className={styles["InformationUser-register-input"]}
                                name="email"
                                value={user.email}
                                readOnly
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : <NotLoggedIn />
}

export default AdminProfile;
