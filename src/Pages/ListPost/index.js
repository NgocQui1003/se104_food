import React, { useState, useEffect } from 'react'
import styles from './ListPost.module.scss';
import { Grid, Box } from '@mui/material';
import ItemPost from '../../Components/ItemPost';
import postApi from '../../Api/postApi';
import savedPostApi from '../../Api/savedPostApi';
import reactionApi from '../../Api/reactionApi';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

import { useHistory } from 'react-router-dom';


import Button from '../Home/Button';



function ListPost() {
    const history = useHistory();
    const urlSearchParams = new URLSearchParams(window.location.search);
    const querySearch = Object.fromEntries(urlSearchParams.entries());
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [sortType, setSortType] = useState('all');
    const [isUpdate, setIsUpdate] = useState(false);
    const [pagination, setPagination] = useState({
        total: 1,
        current_page: querySearch.page || 1,
        limit: 12,
    });


    const fetchPostList = async () => {
        setLoading(true);
        const params = {
            limit: pagination.limit,
            page: pagination.current_page,
            q: sortType,
        }
        const response = await postApi.getPost(params);
        setPosts(response.data)
        setPagination(response.paging)
        setLoading(false);
    }
    useEffect(() => {
        fetchPostList();
        document.title = 'Danh sách bài đăng | Nom Nom';
    }, [isUpdate])

    const updateSortType = (key) => {
        setSortType(key)
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
    const onChangePagination = (e, page) => {
        setPagination({
            ...pagination,
            current_page: page,
        })
        setIsUpdate(!isUpdate);
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


    return (
        <div className={styles['container']}>
            <h1 className={styles['titile']}>Danh sách bài đăng</h1>
            <div className={styles['flex-row']}>
                {sortValue.map(item =>
                    <Button
                        keyBtn={item.key}
                        title={item.value}
                        active={sortType === item.key}
                        onClick={updateSortType}
                    />
                )}
            </div >
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

        </div >
    )
}

export default ListPost;