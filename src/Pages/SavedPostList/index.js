import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../SavedPostList/SavedPostList.module.scss';

// Components
import UserMenu from '../../Components/UserMenu';
import NotLoggedIn from '../../Components/NotLoggedIn';

// Redux
import { userActions } from '../../Redux/Actions/userActions';

// Api
import userApi from '../../Api/userApi';
import savedPostApi from '../../Api/savedPostApi';

function SavedPostList() {
    const { loggedIn, user } = useSelector(state => state.User);
    const dispatch = useDispatch();

    const [savedList, setSavedList] = useState([]);
    console.log(savedList);

    const fetchSavedList = async () => {
        const params = {
            userID: user._id
        }
        const response = await savedPostApi.getAll(params);
        setSavedList(response.data);
    }

    const deletePost = (id) => {

        // setSavedList(response.data);
    }

    useEffect(() => {
        fetchSavedList();
        deletePost();
    }, [])



    function PostItem({ item, idx }) {
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
                    <button onClick={deletePost(item.id_post)} className={styles['menu-btn__delete']} >Xóa</button>
                </div>
            </div>
        );
    };

    return user && loggedIn ? (
        <div className={styles['container']}>
            <UserMenu user={user} />
            {(savedList && savedList.length > 0) ? (
                <div className={styles['list-container']}>
                    <h1 className={styles['list-name']}>Bài viết đã lưu</h1>
                    <div className={styles['list-btn']}>
                        <button className={styles['menu-btn__edit']}>Xóa chọn lọc</button>
                        <button className={styles['menu-btn__delete']}>Xóa tất cả</button>
                    </div>
                    {
                        savedList.map((item, idx) => {
                            return <PostItem item={item} idx={idx} />
                        })
                    }
                </div>

            ) : ( //If the list is Empty
                <div className={styles['list-container']}>
                    <h1 className={styles['list-name']}>Bài viết đã lưu</h1>
                    <div className={styles['list-item__null']}>
                        <p>
                            Bạn chưa lưu bài viết nào.
                        </p>
                    </div>
                </div>
            )}
        </div >
    ) : <NotLoggedIn />
}
export default SavedPostList;