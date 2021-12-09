import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './UsersList.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { Pagination } from '@mui/material';

// Components
import AdminMenu from '../../Components/AdminMenu';
import NotLoggedIn from '../../Components/NotLoggedIn';

// Api
import adminApi from '../../Api/adminApi';

function UsersList() {
    const { user, loggedIn } = useSelector(state => state.User);
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);

    // Pagination setup
    const [currentpage, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const numRows = 10;
    let isAdmin;
    if (user) {
        if (user.role && user.role.role_name === 'admin') {
            isAdmin = true;
        }
    } else {
        isAdmin = false;
    }

    const fetchUserList = async () => {
        setLoading(true);
        const params = {
            page: currentpage,
            limit: numRows,
        }
        const response = await adminApi.getAllUsers(params);
        setUserList(response.data);
        if (response.data) {
            const newList = response.data.map((e) => {
                e.checked = false;
                return e;
            });
            setUserList(newList);
            setTotalPage(Math.ceil((response.paging.total) / numRows));
        }
        window.scrollTo(0, 0);
        setLoading(false);
    }

    const deleteOne = async (user) => {
        let currentList = userList;
        currentList = currentList.filter(itm => itm._id !== user._id);
        setUserList(currentList);
        await adminApi.deleteOne(user._id);
    }

    const fetchCheckedUser = (e) => {
        let currentList = userList;
        currentList = currentList.map((user) => {
            if (e.target.value == user._id) {
                user.checked = !user.checked;
            }
            return user;
        });
        setUserList(currentList);
    }

    const deleteMultiple = async () => {
        let checkedList = userList;
        let arrayids = [];
        checkedList.forEach((user) => {
            if (user.checked) {
                arrayids.push(user._id)
            }
        })
        checkedList = checkedList.filter((user) => user.checked == false);
        setUserList(checkedList);
        await adminApi.deleteMultiple(arrayids);
    };

    const selectAll = (e) => {
        let currentList = userList;
        currentList = currentList.map((user) => {
            return { ...user, checked: true };
        })
        setUserList(currentList);
        // console.log("temp: ", currentList);
    }

    const handlePageChange = (value) => {
        setPage(value);
        window.scrollTo(0, 0);
    }

    const Loading = () => (
        <div className={styles['container-loading']}>
            <CircularProgress />
            <p>Đang tải danh sách bạn đã lưu</p>
        </div>
    )

    useEffect(() => {
        fetchUserList();
    }, [currentpage])



    function UserItem({ item, idx }) {
        return (
            <div className={styles['list-item']} key={idx}>
                <div className={styles['list-item__checkbox']}>
                    <input type="checkbox" value={item._id}
                        onChange={fetchCheckedUser}
                        defaultChecked={item.checked}
                    />
                </div>

                <div className={styles['list-item__container']}>
                    <Link to={`/admin/thong-tin/${item._id}`} className={styles['list-item__link']}>
                        <div className={styles['list-item__thumbnail']}>
                            <img src={item.avatar} className={styles['thumnail']} />
                        </div>
                        <div className={styles['list-item__content']}>
                            <div className={styles['list-item__name']}>
                                Họ tên: {item.lastname} {item.firstname}
                            </div>
                            <div className={styles['list-item__author']}>
                                Email: {item.email}
                            </div>
                            <div className={styles['list-item__description']}>
                                Role: {item.role.role_name}
                            </div>
                        </div>
                    </Link>
                </div>

                <div className={styles['menu-btn']}>
                    <button onClick={() => deleteOne(item)} className={styles['menu-btn__delete']} >Xóa</button>
                </div>
            </div>
        );
    };

    return user && loggedIn && isAdmin ? (
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