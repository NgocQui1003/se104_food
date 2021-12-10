import React, { useState } from 'react';

import UserMenu from '../../Components/UserMenu';
import styles from '../InformationUser/InformationUser.module.scss';

// import avatar from '../../Assets/ava.png'
import { useSelector } from 'react-redux';

// Redux
import { userActions } from '../../Redux/Actions/userActions';

// Api
import userApi from '../../Api/userApi';
import NotLoggedIn from '../../Components/NotLoggedIn';

function InformationUser() {
    const { loggedIn, user } = useSelector(state => state.User);

    return user && loggedIn ? (
        <div className={[styles['InformationUser-container'], styles['auth']].join(' ')}>
            <UserMenu user={user} />
            <div className={styles['InformationUser-container-format']}>
                <h1 className={styles['InformationUser-container-tile']}>Thông Tin Người Dùng</h1>
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
        </div >
    ) : <NotLoggedIn />
}

export default InformationUser;