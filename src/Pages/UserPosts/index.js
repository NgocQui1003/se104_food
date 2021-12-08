import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './UserPosts.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import { Pagination } from '@mui/material';

// Components
import UserMenu from '../../Components/UserMenu';
import NotLoggedIn from '../../Components/NotLoggedIn';

// Redux
import { userActions } from '../../Redux/Actions/userActions';

// Api
import userApi from '../../Api/userApi';

function SavedPostList() {
    const { loggedIn, user } = useSelector(state => state.User);
    const [loading, setLoading] = useState(false);

    const [uploadList, setUploadList] = useState([]);

    // Pagination setup
    const [currentpage, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const numRows = 8;

    const fetchUploadList = async () => {
        setLoading(true);
        const params = {
            limit: numRows,
            page: currentpage
        }
        const response = await userApi.getPosts(params);
        console.log(response);

        if (response.data) {
            const newPost = response.data.map((e) => {
                e.checked = false;
                return e;
            });
            setUploadList(newPost);
            //pagination
            setTotalPage(Math.ceil((response.data.length) / numRows));
        } else {
            setUploadList(response.data);
        }
        setLoading(false);
    }

    const deleteOnePost = async (post) => {
        let currentList = uploadList;
        currentList = currentList.filter(itm => itm._id !== post._id);
        setUploadList(currentList);

        await userApi.deleteOneUpload(post._id);
    }

    // Fetch checked list
    const fetchCheckedPost = (e) => {
        let currentList = uploadList;
        currentList = currentList.map((post) => {
            if (e.target.value == post._id) {
                post.checked = !post.checked;
            }
            return post;
        });
        setUploadList(currentList);
    }

    const deleteMultiple = async () => {
        let checkedList = uploadList;
        let arrayids = [];

        // Lấy ds cần xóa
        checkedList.forEach((post) => {
            if (post.checked) {
                arrayids.push(post._id)
            }
        })
        console.log('array: ', arrayids);

        // Remaining danh sách
        checkedList = checkedList.filter((post) => post.checked == false);
        setUploadList(checkedList);
        await userApi.deleteManyUpload(arrayids);
    };

    const selectAll = () => {
        let currentList = uploadList;
        currentList = currentList.map((post) => {
            return { ...post, checked: true };
        })
        setUploadList(currentList);
    }

    const Loading = () => (
        <div className={styles['container-loading']}>
            <CircularProgress />
            <p>Đang tải danh sách bạn đã đăng</p>
        </div>
    )

    const handlePageChange = (value) => {
        setPage(value);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        fetchUploadList();
    }, [currentpage])

    function PostItem({ item, idx }) {
        return (
            <div className={styles['list-item']} key={idx}>
                <div className={styles['list-item__checkbox']}>
                    <input type="checkbox" value={item._id}
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
                    <Link className={styles['menu-btn__nav']} to='/'>
                        <div className={styles['menu-btn__editpost']}><EditIcon /></div>
                    </Link>

                    <button onClick={() => deleteOnePost(item)} className={styles['menu-btn__delete']} >Xóa</button>
                </div>
            </div>
        );
    };

    return user && loggedIn ? (
        <div className={styles['container']}>
            <UserMenu user={user} />
            <div className={styles['list-container']}>
                <h1 className={styles['list-name']}>Bài viết đã đăng</h1>

                {
                    loading ? <Loading /> : (
                        <>
                            {uploadList && uploadList.length > 0 ?
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
                                            uploadList.map((item, idx) => {
                                                return <PostItem item={item} idx={idx} />
                                            })
                                        }
                                        <div className={styles['list-pagination']}>
                                            <Pagination
                                                count={totalPage}
                                                page={currentpage}
                                                // e.target.textContent la kieu string
                                                onChange={(e, page) => handlePageChange(page)}
                                            ></Pagination>
                                        </div>
                                    </>
                                ) : (
                                    <div className={styles['list-item__null']}>
                                        <p>
                                            Bạn chưa đăng bài viết nào.
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