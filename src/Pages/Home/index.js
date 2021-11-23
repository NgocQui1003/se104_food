import React, { useState, useEffect } from 'react'
import styles from './Home.module.scss';
import { Grid, Box } from '@mui/material';
import ItemPost from '../../Components/ItemPost';
import postApi from '../../Api/postApi';


function Home() {
    
    const [posts, setPosts] = useState([])

    const fetchPostList = async () => {
        const params = {
            page: 1,
            limit: 4,
        }
        const response = await postApi.getPost(params);
        setPosts(response.data)
    }
    useEffect(() => {
        fetchPostList()
    }, [])

    const savePost = (id) => {
        console.log('save post: ', id);
        const newPosts = posts.map(ele => {
            if (ele._id === id) {
                ele.isSave = !ele.isSave;
            }
            return ele;
        })

        setPosts(newPosts)
    }
    const reactPost = (id) => {
        console.log('react post: ', id);
        const newPosts = posts.map(ele => {
            if (ele._id === id) {
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
    }
    
    return (
        <div className={styles['container']}>
            <div className={styles['block-2']}>
                <button>Hôm nay ăn gì?</button>
                <span>hoặc</span>
                <span>dọn tủ lạnh nhà bạn bằng cách nhập nguyên liệu còn thừa dưới đây</span>
                <input placeholder="Cà chua, trứng" />
            </div>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
            <Grid container spacing={4} lg={12}>
                {posts.map((post, index) => 
                    <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                        <ItemPost post={post} savePost={savePost} reactPost={reactPost}/>
                    </Grid>
                )}
            </Grid>

            </Box>
        </div>
    )
}

export default Home;
