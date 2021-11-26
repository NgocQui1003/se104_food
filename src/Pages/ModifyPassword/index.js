import React, { Component, useState } from 'react';

import UserMenu from '../../Components/UserMenu';
import styles from '../ModifyPassword/ModifyPassword.module.scss';


function ModifyPassword() {

    return (
        <div className={[styles['ModifyPassWordContainer-container'], styles['auth']].join(' ')}>
            <UserMenu />
            <div className={styles['ModifyPassWordContainer-container-format']}>
                <h1 className={styles['ModifyPassWordContainer-container-tile']}>Đổi Mật Khẩu</h1>
                <div className={styles['ModifyPassWordContainer-Father']}>
                    <div className={styles["ModifyPassWordContainer-child"]}>
                        <form action="#" className={styles['ModifyPassWordContainer-form']}>
                            <div className={styles["ModifyPassWord-user-details"]}>
                                <div className={styles["ModifyPassWord-input-box"]}>
                                    <lable className={styles["ModifyPassWord-input-box-details"]}>Mật khẩu cũ:</lable>
                                    <input className={styles["ModifyPassWord-register-input"]} type="text"  required />
                                </div>
                                <div className={styles["ModifyPassWord-input-box"]}>
                                    <lable className={styles["ModifyPassWord-input-box-details"]}>Mật khẩu mới:</lable>
                                    <input className={styles["ModifyPassWord-register-input"]} type="text"  required />
                                </div>
                                <div className={styles["ModifyPassWord-input-box"]}>
                                    <lable className={styles["ModifyPassWord-input-box-details"]}>Nhập lại mật khẩu:</lable>
                                    <input className={styles["ModifyPassWord-register-input"]} type="text"  required />
                                </div>
                            </div>
                            <div className={styles["ModifyPassWord-button"]}>
                                <div className={styles["ModifyPassWord-cancel"]}>
                                    <input className={styles["ModifyPassWord-button-cancel"]} type="submit" value="Hủy" />
                                </div>
                                <div className={styles["ModifyPassWord-confirm"]}>
                                    <input className={styles["ModifyPassWord-button-confirm"]} type="submit" value="Xác nhận" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ModifyPassword;