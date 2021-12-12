// User saved post list_shown by Admin only
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './UserSavedList.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { Pagination } from '@mui/material';

// Components
import AdminMenu from '../../Components/AdminMenu';
import NotLoggedIn from '../../Components/NotLoggedIn';

// Api
import savedPostApi from '../../Api/savedPostApi';
import { useParams } from 'react-router';
import adminApi from '../../Api/adminApi';

function UserSavedList() {
    const { loggedIn, user } = useSelector(state => state.User);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [savedList, setSavedList] = useState([]);
    const [current_page, setPage] = useState(1);
    const [total_page, setTotalPage] = useState(1);
    const numRows = 10;
    let isAdmin;
    if (user) {
        if (user.role && user.role.role_name === 'admin') {
            isAdmin = true;
        }
    } else {
        isAdmin = false;
    }

    const fetchSavedList = async () => {
        setLoading(true);
        const params = {
            limit: numRows,
            page: current_page,
            userID: id
        }
        const response = await adminApi.getUserSavedList(params);
        setSavedList(response.sucess);
        if (response.sucess) {
            setSavedList(response.result.data);
            setTotalPage(Math.ceil((response.result.total) / numRows));
        }
        setLoading(false);
    }

    const Loading = () => (
        <div className={styles['container-loading']}>
            <CircularProgress />
            <p>Đang tải danh sách người dùng đã lưu</p>
        </div>
    )

    const handlePageChange = (value) => {
        setPage(value);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        fetchSavedList();
        document.title = 'Admin'
    }, [current_page])



    function PostItem({ item, idx }) {
        return (
            <div className={styles['list-item']} key={idx}>
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
                                Tác giả: {item.author}
                            </div>
                            <div className={styles['list-item__description']}>
                                {item.description}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    };

    return user && loggedIn && isAdmin ? (
        <div className={styles['container']}>
            <AdminMenu user={user} />
            <div className={styles['list-container']}>
                <h1 className={styles['list-name']}>Bài viết đã lưu</h1>
                <div className={styles['list-description']}>
                    Người dùng id: {id}
                </div>
                {
                    loading ? <Loading /> : (
                        <>
                            {savedList && savedList.length > 0 ?
                                (
                                    <>
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
export default UserSavedList;