import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../SavedPostList/SavedPostList.module.scss';
import CircularProgress from '@mui/material/CircularProgress';

// Components
import AdminMenu from '../../Components/AdminMenu';
import NotLoggedIn from '../../Components/NotLoggedIn';

// Api
import adminApi from '../../Api/adminApi';

function UsersList() {
    const { loggedIn, user } = useSelector(state => state.User);
    const [loading, setLoading] = useState(false);

    const [userList, setUserList] = useState([]);

    const fetchUserList = async () => {
        setLoading(true);
        const response = await adminApi.getAllUsers();
        console.log("Users List: ", response);
        setUserList(response.data);
        if (response.data) {
            const newPost = response.data.map((e) => {
                e.checked = false;
                return e;
            });
            setUserList(newPost);
        }
        setLoading(false);
    }

    const deleteOne = (user) => {
        let currentList = userList;
        currentList = currentList.filter(itm => itm.id_post !== user.id_post);
        setUserList(currentList);
        console.log('current list: ', currentList);
        adminApi.deleteOne(user._id);
    }

    const fetchCheckedUser = (e) => {
        let currentList = userList;
        currentList = currentList.map((post) => {
            if (e.target.value == post.id_post) {
                post.checked = !post.checked;
            }
            return post;
        });
        setUserList(currentList);
    }

    const deleteMultiple = async () => {
        let checkedList = userList;
        let arrayids = [];
        checkedList.forEach((post) => {
            if (post.checked) {
                arrayids.push(post.id_post)
            }
        })
        checkedList = checkedList.filter((post) => post.checked == false);
        setUserList(checkedList);
        const res = await adminApi.deleteMultiple(arrayids);
    };

    const selectAll = (e) => {
        let currentList = userList;
        currentList = currentList.map((post) => {
            return { ...post, checked: true };
        })
        setUserList(currentList);
        // console.log("temp: ", currentList);
    }

    const Loading = () => (
        <div className={styles['container-loading']}>
            <CircularProgress />
            <p>Đang tải danh sách bạn đã lưu</p>
        </div>
    )

    useEffect(() => {
        fetchUserList();
    }, [])



    function UserItem({ item, idx }) {
        return (
            <div className={styles['list-item']} key={idx}>
                <div className={styles['list-item__checkbox']}>
                    <input type="checkbox" value={item.id_post}
                        onChange={fetchUserList}
                        defaultChecked={item.checked}
                    />
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
                    <button onClick={() => deleteOne(item)} className={styles['menu-btn__delete']} >Xóa</button>
                </div>
            </div>
        );
    };

    return user && loggedIn ? (
        <div className={styles['container']}>
            <AdminMenu user={user} />
            <div className={styles['list-container']}>
                <h1 className={styles['list-name']}>Danh sách người dùng</h1>

                {
                    loading ? <Loading /> : (
                        <>
                            {userList && userList.length > 0 ?
                                (
                                    <>
                                        <div className={styles['list-btn']}>
                                            <button className={styles['menu-btn__edit']}
                                                onClick={selectAll}>
                                                Chọn tất cả
                                            </button>
                                            <button className={styles['menu-btn__delete']}
                                                onClick={deleteMultiple}>
                                                Xóa chọn lọc
                                            </button>
                                        </div>
                                        {
                                            userList.map((item, idx) => {
                                                return <UserItem item={item} idx={idx} />
                                            })
                                        }
                                    </>
                                ) : (
                                    <div className={styles['list-item__null']}>
                                        <p>
                                            Bạn chưa có người dùng nào. [lỗi rồi]
                                        </p>
                                    </div>
                                )
                            }
                        </>
                    )

                }
            </div>
        </div >
    ) : <NotLoggedIn />
}
export default UsersList;