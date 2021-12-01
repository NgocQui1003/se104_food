import React, { Component, useState } from 'react';

import UserMenu from '../../Components/UserMenu';
import styles from '../ModifyInformation/ModifyInformation.module.scss';
import { useSelector } from 'react-redux';
import NotLoggedIn from '../../Components/NotLoggedIn';

function ModifyInformation() {
    const { loggedIn, user } = useSelector(state => state.User);

    return user && loggedIn ? (
        <div className={[styles['ModifyInformation-container'], styles['auth']].join(' ')}>
            <UserMenu user={user} />
            <div className={styles['ModifyInformation-container-format']}>
                <h1 className={styles['ModifyInformation-container-tile']}>Đổi Thông Tin Người Dùng</h1>
                <div className={styles['ModifyInformation-container-img']}>
                    <img className={styles['ModifyInformation-container-img-thumbnail']} src={user.avatar} />
                </div>
                <div className={styles["ModifyInformation-choose-img"]}>
                    <input className={styles["ModifyInformation-button-choose-mig"]} type="submit" value="Chọn ảnh" />
                </div>
                <div className={styles['ModifyInformation-container-form']}>
                    <form className={styles['ModifyInformation-form']}>
                        <div className={styles["ModifyInformation-form-input"]}>
                            <div>
                                <label for="lastname" className={styles["ModifyInformation-label-input"]}>
                                    Họ:
                                </label>
                                <input type="text" className={styles["ModifyInformation-register-input"]}
                                    name="lastname"
                                    value={user.lastname}
                                    readOnly
                                />
                            </div>
                            <br />
                            <div>
                                <label for="firstname" className={styles["ModifyInformation-label-input"]}>
                                    Tên:
                                </label>
                                <input type="text" className={styles["ModifyInformation-register-input"]}
                                    name="firstname"
                                    value={user.firstname}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className={styles["ModifyInformation-form-input"]}>
                            <label for="gender" className={styles["ModifyInformation-label-input"]}>
                                Giới tính:
                            </label>
                            <div className={styles['ModifyInformation-form-radio-input']}>
                                <label className={styles["ModifyInformation-label-input"]} for="gender">
                                    Nam
                                    <input type="radio" value="Nam"
                                        name="gender"
                                        id="gender-1"
                                        checked={user.gender == "Nam"}
                                    />
                                </label>
                                <label className={styles["ModifyInformation-label-input"]} for="gender">
                                    Nữ
                                    <input type="radio" value="Nữ"
                                        name="gender"
                                        id="gender-0"
                                        checked={user.gender == "Nữ"}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={styles["ModifyInformation-button"]}>
                            <div className={styles["ModifyInformation-cancel"]}>
                                <input className={styles["ModifyInformation-button-cancel"]} type="submit" value="Hủy" />
                            </div>
                            <div className={styles["ModifyInformation-confirm"]}>
                                <input className={styles["ModifyInformation-button-confirm"]} type="submit" value="Xác nhận" />
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    ) : <NotLoggedIn />
}

export default ModifyInformation;