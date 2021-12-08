import React, { useState, useEffect } from 'react'
import styles from './PostList.module.scss';
import { Grid, Box } from '@mui/material';

import { Link, useParams, useLocation, useHistory } from 'react-router-dom'

import ButtonUnderline from '../../Components/ButtonUnderline';
import ItemPost from '../../Components/ItemPost';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';


import postApi from '../../Api/postApi';
import savedPostApi from '../../Api/savedPostApi';
import reactionApi from '../../Api/reactionApi';

import emptyPost from '../../Assets/empty-post.svg';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
function PostList() {
    const location = useLocation();  

    const urlSearchParams = new URLSearchParams(window.location.search);
    const querySearch = Object.fromEntries(urlSearchParams.entries());

    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [pagination, setPagination] = useState({
        total: 1,
        current_page: querySearch.page || 1,
        limit: 12,
    });
    const [isUpdate, setIsUpdate] = useState(false)
    const [sortType, setSortType] = useState(querySearch.sort || 'popular');
    const [search, setSearch] = useState(querySearch.q || '')

    const sortValue = [
        {
            key: 'popular',
            value: 'Phổ biến',
        },
        {
            key: 'new',
            value: 'Mới nhất',
        },
    ]

    useEffect(() => {
        history.push(`/tim-kiem?sort=${sortType}&q=${search}&page=${pagination.current_page}`)
    }, [posts])

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
    const fetchPostListSearch = async () => {
        setLoading(true);

        const params = {
            limit: pagination.limit,
            page: pagination.current_page,
            q: search,
        }
        const response = await postApi.getPostSearch(params);
        setPosts(response.data)
        setPagination({
            ...pagination,
            total: response.paging.total
        })
        setLoading(false);
    }
    useEffect(() => {
        if (search === '') fetchPostList(); else
            fetchPostListSearch();
    }, [isUpdate])

    const setDefaultPage = () => {
        setPagination({
            current_page: 1,
            limit: 12,

        })
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


    const updateSortType = (key) => {
        setSortType(key)
        setDefaultPage()
        setSearch('')
        fetchPostList()
    }

    const EmptyPost = () => {
        return (
            <div className={styles['container-empty-post']}>
                <img src={emptyPost}/> 
                <h2>Không thấy món bạn muốn?</h2>
                <span>Hãy là người đầu tiên chia sẻ cách làm món đó để </span>
                <span>giúp các bạn khác nhé!</span>
                <div className={styles['btn-create-post']}>
                    <LocalDiningIcon sx={{ color: '#fff' }}/>
                    <button onClick={() => history.push('/viet-mon-moi')}>Viết món mới!</button>
                </div>                
            </div>
        )
    }

    const LoadingPost = () => {
        
        return (
            <div className={styles['container-loading-post']}>
                <CircularProgress />
                <p>Đang tìm kiếm món ăn !!!</p> 
            </div>
        )
    }
    const handleSearch = () => {
        if (search.trim() != '') {
            setDefaultPage()
            fetchPostListSearch()    
        }
    }
    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                {sortValue.map((item) =>
                    <ButtonUnderline
                        keyBtn={item.key}
                        title={item.value}
                        active={sortType === item.key}
                        onClick={updateSortType}
                    />
                )}
            </div>


            <div className={styles['content']}>
                <Grid container spacing={4} lg={12}>
                    <Grid item lg={4} md={12} sm={12} xs={12} key={'filter'}>
                        <p className={styles['text-cnt-post']}>
                            {!loading
                            ?<><span>({pagination.total})</span>{` Món tìm được!`}</>
                            :`Đang tìm kiếm !!!`
                        }
                        </p>
                        <div className={styles['filter']}>
                            <div className={styles['container-fillter']}>
                                <h2>Sàng lọc</h2>
                                <h3>Nguyên liệu</h3>
                                <p>Hiển thị các món với:</p>
                                <input
                                    type="text"
                                    placeholder={'Tìm nguyên liệu, tên, ...'}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') handleSearch()}}
                                />
                                <br />
                                <button onClick={handleSearch}>Tìm kiếm</button>
                            </div>
                        </div>
                    </Grid>

                    <Grid item lg={8} md={12} sm={12} xs={12} key={'post'}>
                        {loading === true
                        ? <LoadingPost />
                        :<div className={styles['post']}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid container spacing={4} lg={12}>
                                    {posts.map((post, index) =>
                                        <Grid item lg={4} md={6} sm={6} xs={12} key={index}>
                                            <ItemPost post={post} savePost={savePost} reactPost={reactPost} />
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>

                        </div>}
                        {loading===false&&posts.length===0&&
                            <EmptyPost />
                        }
                    </Grid>

                </Grid>
            </div>
            {
                (posts.length>0 && !loading) &&
                <Pagination
                    className={styles['pagination']}
                    count={Math.floor((pagination.total + pagination.limit - 1) / pagination.limit)}
                    page={parseInt(pagination.current_page)}
                    color="primary"
                    onChange={onChangePagination}
                />

            }

        </div>
    )
}

export default PostList
