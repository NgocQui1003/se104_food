import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './RandomPopup.module.scss';
import CancelIcon from '@mui/icons-material/Cancel';
import postApi from '../../Api/postApi';
import CircularProgress from '@mui/material/CircularProgress';


function RandomPopup(props) {
    const history = useHistory();
    const { trigger, setTrigger } = props;
    const [loading, setLoading] = useState(false)
    const [postRandom, setPostRandom] = useState({})

    const fetchRandomPost = async () => {
        setLoading(true);
        const response = await postApi.getPostRandom();
        if (response && response.data) {
            const { _id, thumbnail_image, id_author, title } = response.data;
            const { data } = await postApi.getPostDetail(_id);
            const { description } = data;
            setPostRandom({ _id, thumbnail_image, title, id_author, description });
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchRandomPost()
    }, [])

    const handleCancel = () => {
        setTrigger(false);
        fetchRandomPost()
    }

    const Loading = () => (
        <div className={styles['container-loading']}>
            <CircularProgress />
            <p>Đang tìm kiếm món ăn phù hợp với bạn nhất!</p>
        </div>
    )
    return trigger ? (
        <div className={styles['popup-container']}>

            <div className={styles['popup-inner']}>
                {loading
                    ? <Loading />
                    : <>
                        <div className={styles['close-btn']}>
                            <CancelIcon onClick={() => handleCancel()} />
                        </div>
                        <div className={styles['random-title']}>
                            <Link to={`/bai-dang/${postRandom['_id']}`}>
                                {postRandom['title']}
                            </Link>
                        </div>
                        <div className={styles['random-image']}>
                            <Link to={`/bai-dang/${postRandom['_id']}`}>
                                <img src={postRandom['thumbnail_image']} />
                            </Link>
                        </div>
                        {postRandom['id_author']
                            ?<div 
                                className={styles['random-author']}
                                onClick={() => history.push(`/danh-sach-bai-viet-ng-dung/${postRandom['id_author']['_id']}`)}
                            >
                                <span className={styles['bold']}>Người nấu: </span>
                                {`${postRandom['id_author']['lastname']} ${postRandom['id_author']['firstname']}`}
                            </div>
                            : ""}
                        <div className={styles['random-description']}>
                            {postRandom['description']}
                        </div>

                    </>
                }

            </div>

        </div>
    ) : null
}

export default RandomPopup;