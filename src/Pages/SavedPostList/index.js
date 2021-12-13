import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from '../SavedPostList/SavedPostList.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { Pagination } from '@mui/material';

// Components
import UserMenu from '../../Components/UserMenu';
import NotLoggedIn from '../../Components/NotLoggedIn';

// Api
import savedPostApi from '../../Api/savedPostApi';

function SavedPostList() {
    const { loggedIn, user } = useSelector(state => state.User);
    const [loading, setLoading] = useState(false);
    const [savedList, setSavedList] = useState([]);
    const [current_page, setPage] = useState(1);
    const [total_page, setTotalPage] = useState(1);
    const numRows = 10;

    const fetchSavedList = async () => {
        setLoading(true);
        const params = {
            limit: numRows,
            page: current_page,
            userID: user._id
        }
        const response = await savedPostApi.getAll(params);
        if (response.success === 1) {
            const newPost = response.result.data.map((e) => {
                e.checked = false;
                return e;
            });
            setSavedList(newPost);
            setTotalPage(Math.ceil((response.result.total) / numRows));
        }
        setLoading(false);
    }

    const unsavedOnePost = (post) => {
        let currentList = savedList;
        currentList = currentList.filter(itm => itm.id_post !== post.id_post);
        setSavedList(currentList);
        console.log('current list: ', currentList);
        savedPostApi.unsavedPost(post.id_post);
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
        const res = await savedPostApi.unsavedMany(arrayids);
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

    const handlePageChange = (value) => {
        setPage(value);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        fetchSavedList();
        document.title = 'Bài viết đã lưu | Nom Nom'
    }, [current_page])



    function PostItem({ item, idx }) {
        return (
            <div className={styles['list-item']} key={idx} id={'post_save_' + item.id_post}>
                <div className={styles['list-item__checkbox']}>
                    <input type="checkbox" value={item.id_post}
                        onChange={fetchCheckedPost}
                        defaultChecked={item.checked}
                    />
                </div>
                <div className={styles['list-item__container']}>
                    <Link to={`/bai-dang/${item.id_post}`} className={styles['list-item__link']}>
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
                    </Link>
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
                                        <div className={styles['list-pagination']}>
                                            <Pagination
                                                count={total_page}
                                                page={current_page}
                                                onChange={(e, page) => handlePageChange(page)}
                                            ></Pagination>
                                        </div>
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