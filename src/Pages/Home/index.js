import React, { useState, useEffect } from 'react'
import styles from './Home.module.scss';
import { Grid, Box } from '@mui/material';
import ItemPost from '../../Components/ItemPost';
import postApi from '../../Api/postApi';
import savedPostApi from '../../Api/savedPostApi';
import reactionApi from '../../Api/reactionApi';

import { useHistory } from 'react-router-dom';


import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import Button from './Button';

import RandomPopup from '../../Components/RandomPopup';

function Home() {
    const history = useHistory();
    const [buttonPopup, setButtonPopup] = useState(false);
    const [posts, setPosts] = useState([])
    const [sortType, setSortType] = useState('all');
    const [search, setSearch] = useState('');

    const fetchPostList = async () => {
        const params = {
            limit: 20,
        }
        const response = await postApi.getPost(params);
        setPosts(response.data)
    }

    useEffect(() => {
        fetchPostList();
    }, [])

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

<<<<<<< HEAD
    const suggestions = ["Bánh A", "Bánh B", "Bánh C", "Bánh D"];
=======
    const sortValue = [
        {
            key: 'all',
            value: 'Tất cả',
        },
        {
            key: 'news',
            value: 'Mới nhất',
        },
        {
            key: 'popular',
            value: 'Phổ biến',
        },
    ]

    const redirectListPost = () => {
        console.log(search);
        if (search != '')
            history.push(`/danh-sach-san-pham?q=${search}`)
    }
>>>>>>> baebbc1a4ab5e7b41931c34be7ca3d95f0cc9138

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
                    <input placeholder="Cà chua, trứng" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {if (e.key === 'Enter') redirectListPost()}}
                    />
                    <div className={styles['icon-search']}
                        onClick={redirectListPost}
                    >
                        <SearchRoundedIcon sx={{ color: '#ffffff' }} />
                    </div>
                </div>
                <div className={styles['more-search-bar']}>
                    <p>Tìm kiếm dựa trên tên và thành phần món ăn.</p>
                </div>
            </div>

<<<<<<< HEAD
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

=======
>>>>>>> baebbc1a4ab5e7b41931c34be7ca3d95f0cc9138
            <div className={styles['heading']}>
                <p className={styles['title']}>CÔNG THỨC NẤU ĂN</p>
                <span className={styles['description']}>Ăn đã, mọi chuyện khác để sau.</span>
            </div>
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

export default Home;
