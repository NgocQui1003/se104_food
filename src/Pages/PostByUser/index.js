import React, { useState, useEffect } from 'react'
import styles from './PostByUser.module.scss';
import { Grid, Box } from '@mui/material';
import ItemPost from '../../Components/ItemPost';
import postApi from '../../Api/postApi';
import savedPostApi from '../../Api/savedPostApi';
import reactionApi from '../../Api/reactionApi';
import { useParams} from 'react-router-dom';


import { useHistory } from 'react-router-dom';


import Button from '../Home/Button';



function ListPost() {
    const { id } = useParams();
    const history = useHistory();
    const [posts, setPosts] = useState([])
    const [sortType, setSortType] = useState('all');
   

    const fetchPostList = async () => {
        const params = {
            limit: 20,
            q: sortType,
        }
        const response = await postApi.getPostByUser(id,params);
        setPosts(response.data)
    }

    useEffect(() => {
        fetchPostList();
    }, [sortType])

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
                    {posts.map((post, index) =>
                        <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                            <ItemPost post={post} savePost={savePost} reactPost={reactPost} />
                        </Grid>
                    )}
                </Grid>
            </Box>
            <div className={styles['container-viewmore']}
                onClick={() => history.push('/danh-sach-san-pham')}
            >
                <button className={styles['btn-viewmore']}>Xem thêm</button>
            </div>
        </div >
    )
}

export default ListPost;
