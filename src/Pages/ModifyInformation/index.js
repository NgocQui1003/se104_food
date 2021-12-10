import React, { Component, useState } from 'react';

import UserMenu from '../../Components/UserMenu';
import styles from '../ModifyInformation/ModifyInformation.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import NotLoggedIn from '../../Components/NotLoggedIn';
import HandleImage from '../../Utils/HandleImage';
import userApi from '../../Api/userApi';
import { userActions } from '../../Redux/Actions/userActions';

function ModifyInformation() {
    const dispatch = useDispatch();

    const userState = useSelector(state => state.User);
    const [user, setUser] = useState(userState.user)
    const [base64Image, setBase64Image] = useState('')

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setUser({
            ...user,
            [name]: value,
        })
    }

    const uploadImage = async e => {
        let file = e.target.files[0];

        let url = URL.createObjectURL(e.target.files[0])
        console.log(url);
        setUser({
            ...user,
            avatar: url,
        })

        HandleImage.getBase64(file)
        .then(result => {
            setBase64Image(result)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
        }

        const res = await userApi.updateProfile(newUser);
        if (res.success) {
            let newProfile = res.data;
            if (base64Image != '') {
                const changeAvatar = await userApi.changeAvatar({avatar: base64Image});
                if (changeAvatar.success)
                    newProfile = changeAvatar.data;
            }

            dispatch(userActions.setProfile(newProfile));
        }

    }


    return userState.user && userState.loggedIn ? (
        <div className={[styles['ModifyInformation-container'], styles['auth']].join(' ')}>
            <UserMenu user={userState.user} />
            <div className={styles['ModifyInformation-container-format']}>
                <h1 className={styles['ModifyInformation-container-tile']}>Đổi Thông Tin Người Dùng</h1>
                <div className={styles['ModifyInformation-container-img']}>
                    <img className={styles['ModifyInformation-container-img-thumbnail']} src={user.avatar} />
                </div>
                <div className={styles["ModifyInformation-choose-img"]}>
                    <div className={styles["avatar-user-profile"]}>
                        <input className={styles['upload-image']}type="file" id="upload-image" name="upload-image" onChange={uploadImage} />
                        <label htmlFor="upload-image">Chọn Ảnh</label>
                    </div>
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
                                    onChange={handleOnChange}
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
                                    onChange={handleOnChange}
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
                                        onChange={handleOnChange}
                                    />
                                </label>
                                <label className={styles["ModifyInformation-label-input"]} for="gender">
                                    Nữ
                                    <input type="radio" value="Nữ"
                                        name="gender"
                                        id="gender-0"
                                        checked={user.gender == "Nữ"}
                                        onChange={handleOnChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={styles["ModifyInformation-button"]}>
                            <div className={styles["ModifyInformation-cancel"]}>
                                <input className={styles["ModifyInformation-button-cancel"]} type="submit" value="Hủy" />
                            </div>
                            <div className={styles["ModifyInformation-confirm"]}>
                                <input className={styles["ModifyInformation-button-confirm"]} type="submit" value="Xác nhận" 
                                    onClick={handleSubmit}/>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div >
    ) : <NotLoggedIn />
}

export default ModifyInformation;