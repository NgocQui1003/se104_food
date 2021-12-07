import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './PostDetail.module.scss';

import postApi from '../../Api/postApi';
import savedPostApi from '../../Api/savedPostApi';
import reactionApi from '../../Api/reactionApi';

import Modal from '@mui/material/Modal';
import { LinkedCameraOutlined } from '@mui/icons-material';


function PostDetail() {
    const { loggedIn, user } = useSelector((state) => state.User);
    const { _id } = useParams();
    const [post , setData] = useState(); 
    const [like, setLike] = useState();
    // const history = useHistory();

    // useEffect(async () => {
    //     if (!_id) {
    //         history.push('/')
    //         return
    //     }
    //     const data = await postApi.getPostDetail(_id);
    //     // console.log('data: ',data)
    //     setData(data.data);
    //     window.scrollTo(0, 0)
    // }, [_id])

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

    // set title for page
    useEffect(() => {
        fetchData();
        document.title = post ? post.title : '';
    }, [])

    
    
  return post ? (
    <div className={styles['food']}>
            <div className={styles['food_image']}>
                <img src={post.thumbnail_image} alt={post.title} />
            </div>
            
            <div className={styles['food_info']}>
                <div className={styles['food_owner']}></div>
                <div className={styles['food_title']}>
                    <h1>{post.title}</h1>
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
                <button className={styles['btn_save']}><i class="far fa-bookmark"></i></button>
                <button className={styles['btn_like']} onClick={reactPost}>{like} <i class="far fa-heart"></i></button>
            </div>
        </div>
  ) : null
}

export default PostDetail;