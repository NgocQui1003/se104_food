import React, { useEffect, useState } from 'react';

import styles from '../DeleteUsers/DeleteUsers.module.scss';
//import UserMenu from '../../Components/UserMenu';
import AdminMenu from '../../Components/AdminMenu';
import avatar from '../../Assets/ava.png'

function DeleteUsers() {

    /*const saved = useSelector(state => state.savedList);
    const dispatch = useDispatch();*/

    // Post item Component
    /*const postItem = ({ item, idx }) => {
        return (
            <div className={styles['list-item']} key={idx}>
                <div className={styles['list-item__checkbox']}>
                    <input type="checkbox" />
                </div>
                <div className={styles['list-item__container']}>
                    <div className={styles['list-item__thumbnail']}>
                        <img src={item.thumbnail_image} className={styles['thumnail']} />
                    </div>
                    <div className={styles['list-item__content']}>
                        <div className={styles['list-item__name']}>
                            {item.title}
                        </div>
                        <div className={styles['list-item__author']}>
                            {item.author}
                        </div>
                        <div className={styles['list-item__description']}>
                            {item.description}
                        </div>
                    </div>
                </div>
                <div className={styles['menu-btn']}>
                    <button className={styles['menu-btn__delete']} >Xóa</button>
                </div>
            </div>
        )
    }*/

    /*const [savedList, setSavedList] = useState();


    useEffect(() => {
        const fetchSavedList = async () => {
            try {
                const response = await savedPostApi.getAll();
                console.log(response);
            } catch (error) {
                console.log("Failed to fetch saved list: " + error);
            }
        }

        fetchSavedList();
    }, [])

    const deletePost = (id) => {
        if (window.confirm("Bạn có muốn xóa bài viết")) {

        }
    }*/

    const item = {
        title: "Nguyễn Ngọc Quí",
        author: "Qui",
        description: "Banh mi duoc lam tu mi",
        thumbnail_image: avatar
    }

    return (
        <div className={styles['DeleteUserscontainer']}>
            <AdminMenu />
            <div className={styles['DeleteUserslist-container']}>
                <h1 className={styles['DeleteUserslist-name']}>Xóa Người Dùng</h1>
                <div className={styles['DeleteUserslist-btn']}>
                    <button className={styles['DeleteUsersmenu-btn__edit']}>Xóa chọn lọc</button>
                    <button className={styles['DeleteUsersmenu-btn__delete']}>Xóa tất cả</button>
                </div>
                <div className={styles['DeleteUserslist-item']} /*key={idx}*/>
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
            </div>
        </div >
    )
}

export default DeleteUsers;