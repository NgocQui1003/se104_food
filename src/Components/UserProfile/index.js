import React from 'react';
import styles from './UserProfile.module.scss';

import { Link } from 'react-router-dom';

function UserProfile({ profile }) {
    console.log(profile);
    return (
        <div className={styles['InformationUser-container-format']}>
            <h1 className={styles['InformationUser-container-tile']}>Thông tin</h1>
            <div className={styles['btn-list']}>
                <Link to={`/admin/thong-tin/ds-luu/${profile._id}`} className={styles['user-btn__link']}>
                    Xem danh sách bài lưu
                </Link>
                <Link to={`/danh-sach-bai-viet-ng-dung/${profile._id}`} className={styles['user-btn__link']}>
                    Xem danh sách bài đăng
                </Link>
            </div>
            <div className={styles['InformationUser-container-img']}>
                <img className={styles['InformationUser-container-img-thumbnail']} src={profile.avatar} />
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
                                value={profile.lastname}
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
                                value={profile.firstname}
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
                                    checked={profile.gender ? profile.gender.toLowerCase() == "nam" : false}
                                />
                            </label>
                            <label className={styles["InformationUser-label-input"]} for="gender">
                                Nữ
                                <input type="radio" value="Nữ"
                                    name="gender"
                                    id="gender-0"
                                    checked={profile.gender ? profile.gender.toLowerCase() == "nữ" : false}
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
                                    checked={profile.role ? profile.role.role_name == "user" : false}
                                />
                            </label>
                            <label className={styles["InformationUser-label-input"]} for="role">
                                Admin
                                <input type="radio" value="admin"
                                    name="role"
                                    id="role-1"
                                    checked={profile.role ? profile.role.role_name == "admin" : false}
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
                            value={profile.email}
                            readOnly
                        />
                    </div>
                </form>
            </div>
        </div >
    )
}

export default UserProfile;
