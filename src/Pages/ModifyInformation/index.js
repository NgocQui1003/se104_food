import React, { Component, useState } from 'react';

import UserMenu from '../../Components/UserMenu';
import styles from '../ModifyInformation/ModifyInformation.module.scss';
import avatar from '../../Assets/ava.png'

function ModifyInformation() {

    const user = {
        firstname: "Nguyễn",
        lastname: "Ngọc Quí",
        gender: "Nam",
        email: "nguyenngocqui@gmail.com"
    }

    return (
        <div className={[styles['ModifyInformation-container'], styles['auth']].join(' ')}>
            <UserMenu />
            <div className={styles['ModifyInformation-container-format']}>
                <h1 className={styles['ModifyInformation-container-tile']}>Đổi Thông Tin Người Dùng</h1>
                <div className={styles['ModifyInformation-container-img']}>
                    <img className={styles['ModifyInformation-container-img-thumbnail']} src={avatar} />
                </div>
                <div className={styles["ModifyInformation-choose-img"]}>
                    <input className={styles["ModifyInformation-button-choose-mig"]} type="submit" value="Chọn ảnh" />
                </div>
                <div className={styles['ModifyInformation-container-form']}>
                    <form className={styles['ModifyInformation-form']}>
                        <div className={styles["ModifyInformation-form-input"]}>
                            <div>
                                <label for="firstname" className={styles["ModifyInformation-label-input"]}>
                                    Họ:
                                </label>
                                <input type="text" className={styles["ModifyInformation-register-input"]}
                                    name="firstname"
                                    value={user.firstname}
                                    readOnly
                                />
                            </div>
                            <br />
                            <div>
                                <label for="lastname" className={styles["ModifyInformation-label-input"]}>
                                    Tên:
                                </label>
                                <input type="text" className={styles["ModifyInformation-register-input"]}
                                    name="lastname"
                                    value={user.lastname}
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

                                    />
                                </label>
                                <label className={styles["ModifyInformation-label-input"]} for="gender">
                                    Nữ
                                    <input type="radio" value="Nữ"
                                        name="gender"
                                        id="gender-0"

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
    )
}

export default ModifyInformation;