import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from './ItemPost.module.scss';

import Card from '@mui/material/Card';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import CancelIcon from '@mui/icons-material/Cancel';
import Modal from '@mui/material/Modal';
import { HistoryOutlined } from '@mui/icons-material';

function ItemPost({ post, savePost, reactPost }) {
    const history = useHistory()
    const userState = useSelector((state) => state.User);
    const id = post._id;
    const [openModel, setOpenModel] = useState(false)
    const formatTitle = (title) => {
        let sz = title.length;
        if (sz > 50)
            return title.slice(0, Math.min(50, sz)) + "...";
        return title;
    }

    const handleClose = () => {
        setOpenModel(false);
    }

    const handleReactPost = () => {
        if (userState && userState.loggedIn) {
            reactPost(id);
        } else {
            setOpenModel(true);
        }
    }

    const handleSavePost = () => {
        if (userState && userState.loggedIn) {
            savePost(id);
        } else {
            setOpenModel(true);
        }
    }

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
    const onClickAvatar = (id) => {
        history.push(`/danh-sach-bai-viet-ng-dung/${id}`)
    }
    return (
        <div className={styles['container']}>
            <ModelCustom />
            <Card>
                <div className={styles['container-img-button']}>
                    <img
                        src={post['thumbnail_image']}
                        alt={post['thumbnail_image']}
                    />
                    <div onClick={handleSavePost}>
                        {post.isSaved
                            ? <BookmarkIcon className={styles['bookmark-icon']} />
                            : <BookmarkBorderIcon className={styles['bookmark-icon']} />}
                    </div>


                </div>

                <div className={styles['content-more']}>
                    <p>
                        {formatTitle(post['title'])}
                    </p>
                    <div className={styles['container-avatar-user']}
                        onClick={() => onClickAvatar(post['id_author']['_id'])}
                    >
                        <img
                            src={post['id_author']['avatar']}
                            alt='avatar-user'
                        />
                        <span>{`${post['id_author']['firstname']} ${post['id_author']['lastname']}`}</span>
                    </div>
                    <div className={`${styles['btn-like']} ${post['isLike'] ? styles['active'] : ''}`}
                        onClick={handleReactPost}
                    >
                        {post['isLike']
                            ? <ThumbUpIcon
                                style={{ color: "#2078F4", fontSize: "14px" }}
                            />
                            : <ThumbUpOutlinedIcon
                                style={{ color: "#65676B", fontSize: "14px" }}
                            />

                        }
                        <span>{post["numberLike"]}</span>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default ItemPost;
