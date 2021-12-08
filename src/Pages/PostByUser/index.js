import React, { useState, useEffect } from 'react'
import styles from './PostByUser.module.scss';
import { Grid, Box } from '@mui/material';
import ItemPost from '../../Components/ItemPost';
import postApi from '../../Api/postApi';
import savedPostApi from '../../Api/savedPostApi';
import reactionApi from '../../Api/reactionApi';
import { useParams } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';

import { useHistory } from 'react-router-dom';


import Button from '../Home/Button';

import NotFound from '../NotFound';
import { style } from '@mui/system';


function ListPost() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const querySearch = Object.fromEntries(urlSearchParams.entries());


    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [userNotFound, setUserNotFound] = useState(false)
    const [sortType, setSortType] = useState('all');
    const [isUpdate, setIsUpdate] = useState(false)

    const [pagination, setPagination] = useState({
            total: 1,
            current_page: querySearch.page || 1,
            limit: 5,
    })

    const fetchPostList = async () => {
        setLoading(true);
        const params = {
            limit: 12,
            q: sortType,
            page: pagination.current_page,
        }
        const response = await postApi.getPostByUser(id, params);
        if (response.message === 'Success') {
            setPosts(response.data)
            setPagination(response.paging)
        } else
            setUserNotFound(true);

        setLoading(false);
    }

    useEffect(() => {
        fetchPostList();
    }, [isUpdate])


    const updateSortType = (key) => {
        setSortType(key)
        setPagination({
            ...pagination,
            current_page: 1,
        })

        setIsUpdate(!isUpdate);
    }

    const savePost = async (id) => {
        let currSave;
        const newPosts = posts.map(ele => {
            if (ele._id === id) {
                currSave = ele.isSaved;
                ele.isSaved = !ele.isSaved;
            }
            return ele;
        })
        setPosts(newPosts)

        if (currSave) {
            await savedPostApi.unsavedPost(id);
        } else {
            await savedPostApi.savedPost(id);
        }
    }
    const reactPost = async (id) => {
        let curLike;
        const newPosts = posts.map(ele => {
            if (ele._id === id) {
                curLike = ele.isLike;
                if (ele.isLike) {
                    ele.isLike = false;
                    ele.numberLike--;
                } else {
                    ele.isLike = true;
                    ele.numberLike++;
                }

            }
            return ele;
        })

        setPosts(newPosts)

        if (curLike) {
            await reactionApi.unliked(id);
        } else {
            await reactionApi.liked(id);
        }
    }

    const sortValue = [
        {
            key: 'all',
            value: 'Tất cả',
        },
        {
            key: 'new',
            value: 'Mới nhất',
        },
        {
            key: 'popular',
            value: 'Phổ biến',
        },
    ]


    const onChangePagination = (e, page) => {
        setPagination({
            ...pagination,
            current_page: page,
        })
        setIsUpdate(!isUpdate);
    }

    const PageLoading = () => {
        return (
            <div className={styles['page-loading']}>
                <p>Đang tải danh sách bài viết</p>
            </div>
        )
    }


    return (
        <div className={styles['container']}>
            {loading && <PageLoading />}
            {userNotFound
                ? <NotFound />
                :
                <>
                    {!loading && <div className={styles['flex-row']}>
                        {sortValue.map(item =>
                            <Button
                                keyBtn={item.key}
                                title={item.value}
                                active={sortType === item.key}
                                onClick={updateSortType}
                            />
                        )}
                    </div >}
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid container spacing={4} lg={12}>
                            {!loading && posts.map((post, index) =>
                                <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                                    <ItemPost post={post} savePost={savePost} reactPost={reactPost} />
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                    {!loading && <Pagination
                        className={styles['pagination']}
                        count={Math.floor((pagination.total + pagination.limit - 1) / pagination.limit)}
                        page={parseInt(pagination.current_page)}
                        color="primary"
                        onChange={onChangePagination}
                    />}
                </>}
        </div >
    )
}

export default ListPost;
