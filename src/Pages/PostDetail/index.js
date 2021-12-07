import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './PostDetail.module.scss';

import postApi from '../../Api/postApi';
import savedPostApi from '../../Api/savedPostApi';
import reactionApi from '../../Api/reactionApi';

import CancelIcon from '@mui/icons-material/Cancel';
import Modal from '@mui/material/Modal';

function PostDetail() {
    const userState = useSelector((state) => state.User);
    const history = useHistory();
    const { _id } = useParams();
    const [post , setData] = useState(); 
    const [like, setLike] = useState();
    const [save, setSaved] = useState();
    const [openModel, setOpenModel] = useState(false);

    const handleClose = () => {
        setOpenModel(false);
    }

    const handleReactPost = () => {
        if (userState && userState.loggedIn) {
            reactPost();
        } else {
            setOpenModel(true);
        }
    }

    const handleSavePost = () => {
        if (userState && userState.loggedIn) {
            savePost();
        } else {
            setOpenModel(true);
        }
    }

    const fetchData = async () => {
        const res = await postApi.getPostDetail(_id);
        console.log("Response: ", res);
        setData(res.data);
    }

    const reactPost = async () => {
        let current_post = post;
        
        if (current_post.isLike) {
            current_post.isLike = false;
            current_post.numberLike -= 1;
        } else {
            current_post.isLike = true;
            current_post.numberLike += 1;
        }

        setData(current_post);
        let like = post.numberLike
        setLike(like);
        console.log('React Post: ', post);

        if (current_post.isLike) {
            await reactionApi.liked(current_post._id);
        } else {
            await reactionApi.unliked(current_post._id);
        }
    }

    const savePost = async () => {
        let current_post = post;
        
        if (current_post.isSaved) {
            current_post.isSaved = false;
        } else {
            current_post.isSaved = true;
        }

        setData(current_post);
        let save = post.isSaved;
        setSaved(save);
        console.log('Saved Post: ', post);

        if (current_post.isSaved) {
            await savedPostApi.savedPost(current_post._id);
        } else {
            await savedPostApi.unsavedPost(current_post._id);
        }
    }

    // fetch data
    useEffect(() => {
        fetchData();
    }, [])

    // set title for page with post
    useEffect( async () => {
        if (post) {
            document.title = post.title;
        } else {
            document.title = 'Loading...';
        }
    }, [post])

    const ModelCustom = () => {

        return <Modal
            open={openModel}
            onClose={handleClose}
        >
            <div className={styles['container-modal']}>
                <div className={styles['close-btn']}>
                    <CancelIcon onClick={handleClose} />
                </div>
                <h2>Đăng nhập hệ thống</h2>

                <p>Bạn vui lòng đăng nhập để thực hiện chức năng này.</p>

                <div className={styles['cnt-btn']}>
                    <button onClick={() => history.push('/dang-nhap')}>Đăng nhập</button>
                    <button onClick={handleClose}>Hủy</button>
                </div>
            </div>
        </Modal>
    }
    return post ? (
        <div className={styles['food']}>
            <ModelCustom />
                <div className={styles['food_image']}>
                    <img src={post.thumbnail_image} alt={post.title} />
                </div>
                
                <div className={styles['food_info']}>
                    <div className={styles['food_owner']}></div>
                    <div className={styles['food_title']}>
                        <h1>{post.title}</h1>
                    </div>
                    <div className={styles['container-avatar-user']}>
                        <img
                            src={post.id_author.avatar}
                            alt='avatar-user'
                        />
                        <span>{post.id_author.firstname} {post.id_author.lastname} </span>
                    </div>
                    <div className={styles['food_description']}>
                        <div className={styles['food-description_title']}>
                            <h2>Mô tả:</h2>
                        </div>
                        <div className={styles['food-description_content']} dangerouslySetInnerHTML={{
                            __html: post.description}}>
                        </div>
                    </div>
                    <div className={styles['food_material']}>
                        <div className={styles['ffood-material_titleood_info']}>
                            <h2>Nguyên liệu:</h2>
                        </div>
                        <div className={styles['food-material_content']}>
                            {post.ingredients.map((food, i) => {
                                return <li key={i}>{food.name} : {food.quantity}.</li>
                            })}
                        </div>
                    </div>
                    <div className={styles['foofood_stepd_info']}>
                        <div className={styles['food-step_title']}>
                            <h2>Các bước làm:</h2>
                        </div>
                        <div className={styles['food-step_content']}>
                            {post.directions.map((food, i) => {
                                return <p key={i}><b>Bước {food.step}:</b>ㅤ{food.description}.</p>
                            })}
                        </div>
                    </div>
                </div>
                <div className={styles['food_btn']}>
                    <button className={styles['btn_save']} onClick={handleSavePost}><i class={save ? "fas fa-bookmark" : "far fa-bookmark"}></i></button>
                    <button className={styles['btn_like']} onClick={handleReactPost}>{like ? like : post.numberLike} <i class={post.isLike ? "fas fa-heart" : "far fa-heart"}></i></button>
                </div>
            </div>
    ) : null
}

export default PostDetail;