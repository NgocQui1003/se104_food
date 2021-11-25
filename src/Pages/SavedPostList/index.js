import React, { useEffect, useState } from 'react';

import styles from '../SavedPostList/SavedPostList.module.scss';
import UserMenu from '../../Components/UserMenu';
import savedPostApi from '../../Api/savedPostApi';
import { useSelector, useDispatch } from 'react-redux';

function SavedPostList() {

    const saved = useSelector(state => state.savedList);
    const dispatch = useDispatch();

    // Post item Component
    const postItem = ({ item, idx }) => {
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
    }

    const [savedList, setSavedList] = useState();


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
    }

    return (
        <div className={styles['container']}>
            <UserMenu />
            {(saved && saved.count) ? (
                <div className={styles['list-container']}>
                    <h1 className={styles['list-name']}>Bài viết đã lưu</h1>
                    <div className={styles['list-btn']}>
                        <button className={styles['menu-btn__edit']}>Xóa chọn lọc</button>
                        <button className={styles['menu-btn__delete']}>Xóa tất cả</button>
                    </div>
                    {
                        saved.items.map((item, idx) => {
                            return <postItem item={item} idx={idx}></postItem>
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
    )
}

export default SavedPostList;