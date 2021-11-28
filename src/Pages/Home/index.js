import React, { useState, useEffect } from 'react'
import styles from './Home.module.scss';
import { Grid, Box } from '@mui/material';
import ItemPost from '../../Components/ItemPost';
import postApi from '../../Api/postApi';

import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import Button from './Button';
import ButtonUnderline from './ButtonUnderline';

import RandomPopup from '../../Components/RandomPopup';

function Home() {

    const [buttonPopup, setButtonPopup] = useState(false);


    const [posts, setPosts] = useState([])
    const [postTitles, setPostTitles] = useState([])

    const fetchPostList = async () => {
        const params = {
            page: 1,
            limit: 16,
        }
        const response = await postApi.getPost(params);
        setPosts(response.data)
    }
    const fetchPostTitleList = async () => {
        const params = {
            page: 1,
            limit: 4,
        }
        const response = await postApi.getPost(params);
        setPostTitles(response.data)
    }
    useEffect(() => {
        fetchPostList();
        fetchPostTitleList();
    }, [])

    const savePost = (id) => {
        const newPosts = posts.map(ele => {
            if (ele._id === id) {
                ele.isSave = !ele.isSave;
            }
            return ele;
        })

        setPosts(newPosts)
    }
    const reactPost = (id) => {
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

    const suggestions = ["Bánh A", "Bánh B", "Bánh C", "Bánh D"];

    return (
        <div className={styles['container']}>

            <div className={styles['block-2']}>
                <button onClick={() => setButtonPopup(true)}>Hôm nay ăn gì?</button>
                <RandomPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
                </RandomPopup>
                <span>hoặc</span>
                <span>dọn tủ lạnh nhà bạn bằng cách nhập nguyên liệu còn thừa dưới đây</span>
                <div className={styles['search-bar']}>
                    <LocalDiningIcon sx={{ color: '#EB4A36' }} />
                    <input placeholder="Cà chua, trứng" />
                    <div className={styles['icon-search']}>
                        <SearchRoundedIcon sx={{ color: '#ffffff' }} />
                    </div>
                </div>
                <div className={styles['more-search-bar']}>
                    <p>MÓN TÌM KIẾM PHỔ BIẾN HÔM NAY</p>
                    {suggestions.map((ele => <span>{ele}</span>))}
                </div>
            </div>

            <div className={styles['container-btn-0']}>
                {/* Component 0 */}
                <ButtonUnderline key={""} title={"Cơm gà Ngô Quyền"} active={true} onClick={""} />
                <ButtonUnderline key={""} title={"Hủ tiếu Sa Đéc"} active={false} onClick={""} />
                <ButtonUnderline key={""} title={"Bún đậu mắm tôm"} active={false} onClick={""} />

            </div>


            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Grid container spacing={4} lg={12}>
                    {postTitles.map((post, index) =>
                        <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                            <ItemPost post={post} savePost={savePost} reactPost={reactPost} />
                        </Grid>
                    )}
                </Grid>
            </Box>
            <div className={styles['container-viewmore']}>
                <button className={styles['btn-viewmore']}>Xem thêm</button>
            </div>

            <br />
            <br />

            <div className={styles['heading']}>
                <p className={styles['title']}>CÔNG THỨC NẤU ĂN</p>
                <span className={styles['description']}>Ăn đã, mọi chuyện khác để sau.</span>
            </div>
            <div className={styles['flex-row']}>
                <Button key={""} title={"Tất cả"} active={true} onClick={""} />
                <Button key={""} title={"Mới nhất"} active={false} onClick={""} />
                <Button key={""} title={"Phổ biến"} active={false} onClick={""} />
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
        </div >
    )
}

export default Home;
