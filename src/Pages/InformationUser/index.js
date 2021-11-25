import React, { Component, useState } from 'react';

import UserMenu from '../../Components/UserMenu';
import styles from '../InformationUser/InformationUser.module.scss';

import avatar from '../../Assets/ava.png'


function InformationUser() {

    const user = {
        firstname: "Nguyễn",
        lastname: "Ngọc Quí",
        gender: "Nam",
        email: "nguyenngocqui@gmail.com"
    }

    return (
        <div className={[styles['InformationUser-container'], styles['auth']].join(' ')}>
            <UserMenu />
            <div className={styles['InformationUser-container-format']}>
                <h1 className={styles['InformationUser-container-tile']}>Thông Tin Người Dùng</h1>
                <div className={styles['InformationUser-container-img']}>
                    <img className={styles['InformationUser-container-img-thumbnail']} src={avatar} />
                </div>
                <div className={styles['InformationUser-container-form']}>
                    <form className={styles['InformationUser-form']}>
                        <div className={styles["InformationUser-form-input"]}>
                            <div>
                                <label for="firstname" className={styles["InformationUser-label-input"]}>
                                    Họ:
                                </label>
                                <input type="text" className={styles["InformationUser-register-input"]}
                                    name="firstname"
                                    value={user.firstname}
                                    readOnly
                                />
                            </div>
                            <br />
                            <div>
                                <label for="lastname" className={styles["InformationUser-label-input"]}>
                                    Tên:
                                </label>
                                <input type="text" className={styles["InformationUser-register-input"]}
                                    name="lastname"
                                    value={user.lastname}
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
                                        
                                    />
                                </label>
                                <label className={styles["InformationUser-label-input"]} for="gender">
                                    Nữ
                                    <input type="radio" value="Nữ"
                                        name="gender"
                                        id="gender-0"

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
    )
}

export default InformationUser;