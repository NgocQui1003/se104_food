import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../SavedPostList/SavedPostList.module.scss';
import CircularProgress from '@mui/material/CircularProgress';

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
    const [loading, setLoading] = useState(false);

    const [savedList, setSavedList] = useState([]);

    const fetchSavedList = async () => {
        setLoading(true);
        const params = {
            userID: user._id
        }
        const response = await savedPostApi.getAll(params);
        setSavedList(response.data);
        const newPost = response.data.map((e) => {
            e.checked = false;
            return e;
        });
        setSavedList(newPost);
        setLoading(false);
    }

    const unsavedOnePost = (post) => {
        let currentList = savedList;
        currentList = currentList.filter(itm => itm.id_post !== post.id_post);
        setSavedList(currentList);
        console.log('current list: ', currentList);
        // savedPostApi.unsavedPost(post.id_post);
    }

    const fetchCheckedPost = (e) => {
        let currentList = savedList;
        currentList = currentList.map((post) => {
            if (e.target.value == post.id_post) {
                post.checked = !post.checked;
            }
            return post;
        });
        setSavedList(currentList);
    }

    const unsavedMultiple = async () => {
        let checkedList = savedList;
        let arrayids = [];
        checkedList.forEach((post) => {
            if (post.checked) {
                arrayids.push(post.id_post)
            }
        })
        checkedList = checkedList.filter((post) => post.checked == false);
        setSavedList(checkedList);
        // const res = await savedPostApi.unsavedMany(arrayids);
    };

    const selectAll = (e) => {
        let currentList = savedList;
        currentList = currentList.map((post) => {
            return { ...post, checked: true };
        })
        setSavedList(currentList);
        // console.log("temp: ", currentList);
    }

    const Loading = () => (
        <div className={styles['container-loading']}>
            <CircularProgress />
            <p>Đang tải danh sách bạn đã lưu</p>
        </div>
    )

    useEffect(() => {
        fetchSavedList();
    }, [])



    function PostItem({ item, idx }) {
        return (
            <div className={styles['list-item']} key={idx}>
                <div className={styles['list-item__checkbox']}>
                    <input type="checkbox" value={item.id_post}
                        onChange={fetchCheckedPost}
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
                    <button onClick={() => unsavedOnePost(item)} className={styles['menu-btn__delete']} >Xóa</button>
                </div>
            </div>
        );
    };

    return user && loggedIn ? (
        <div className={styles['container']}>
            <UserMenu user={user} />
            <div className={styles['list-container']}>
                <h1 className={styles['list-name']}>Bài viết đã lưu</h1>

                {
                    loading ? <Loading /> : (
                        <>
                            {savedList && savedList.length > 0 ?
                                (
                                    <>
                                        <div className={styles['list-btn']}>
                                            <button className={styles['menu-btn__edit']}
                                                onClick={selectAll}>
                                                Chọn tất cả
                                            </button>
                                            <button className={styles['menu-btn__delete']}
                                                onClick={unsavedMultiple}>
                                                Xóa chọn lọc
                                            </button>
                                        </div>
                                        {
                                            savedList.map((item, idx) => {
                                                return <PostItem item={item} idx={idx} />
                                            })
                                        }
                                    </>
                                ) : (
                                    <div className={styles['list-item__null']}>
                                        <p>
                                            Bạn chưa lưu bài viết nào.
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
export default SavedPostList;