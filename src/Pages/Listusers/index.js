import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NotLoggedIn from '../../Components/NotLoggedIn';
import CircularProgress from '@mui/material/CircularProgress';

import styles from '../ListUsers/ListUsers.module.scss';
//import UserMenu from '../../Components/UserMenu';
import AdminMenu from '../../Components/AdminMenu';
import avatar from '../../Assets/ava.png'
import userApi from '../../Api/userApi';

function ListUsers() {
    //xét đăng nhập
    const { loggedIn, user } = useSelector(state => state.User);
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);

    const fetchUserList = async () => {
        setLoading(true);
        const params = {
            userID: user._id
        }
        const response = await userApi.getAll(params);
        setUserList(response.data);
        setLoading(false);
    }

    const Loading = () => (
        <div className={styles['container-loading']}>
            <CircularProgress />
            <p>Đang tải danh sách bạn đã lưu</p>
        </div>
    )

    function UserItem({ item, idx }) {
        return (
            <div className={styles['DeleteUserslist-item']} key={idx}>
                <div className={styles['DeleteUserslist-item__checkbox']}>
                    <input type="checkbox" />
                </div>
                <div className={styles['DeleteUserslist-item__container']}>
                    <div className={styles['DeleteUserslist-item__thumbnail']}>
                        <img src={item.thumbnail_image} className={styles['DeleteUsersthumbnail']} />
                    </div>
                    <div className={styles['DeleteUserslist-item__content']}>
                        <div className={styles['DeleteUserslist-item__name']}>
                            {item.title}
                        </div>
                    </div>
                </div>
                <div className={styles['DeleteUsersmenu-btn']}>
                    <button className={styles['DeleteUsersmenu-btn__delete']} >Xóa</button>
                </div>
            </div>
        )
    }

    // const item = {
    //     title: "Nguyễn Ngọc Quí",
    //     author: "Qui",
    //     description: "Banh mi duoc lam tu mi",
    //     thumbnail_image: avatar
    // }

    return (
        <div className={styles['DeleteUserscontainer']}>
            {
                loggedIn && user ? (
                    <>
                        <AdminMenu />
                        <div className={styles['DeleteUserslist-container']}>
                            <h1 className={styles['DeleteUserslist-name']}>Danh Sách Người Dùng</h1>
                            {
                                loading ? <Loading /> : (
                                    <>
                                        <div className={styles['DeleteUserslist-btn']}>
                                            <button className={styles['DeleteUsersmenu-btn__edit']}>Xóa chọn lọc</button>
                                            <button className={styles['DeleteUsersmenu-btn__delete']}>Xóa tất cả</button>
                                        </div>
                                        {
                                            userList.map((user, idx) => {
                                                return <UserItem item={user} idx={idx}></UserItem>
                                            })
                                        }
                                    </>
                                )
                            }
                        </div>
                    </>
                ) : <NotLoggedIn />
            }
        </div >
    )
}
export default ListUsers;
