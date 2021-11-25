import React from 'react';
import styles from './ItemPost.module.scss';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

function ItemPost({ post, savePost, reactPost }) {

    const formatTitle = (title) => {
        let sz = title.length;
        if (sz > 50)
            return title.slice(0, Math.min(50, sz)) + "...";
        return title;
    }
    return (
        <div className={styles['container']}>
            <Card>
                <div className={styles['container-img-button']}>
                    <img
                        src={post['thumbnail_image']}
                        alt={post['thumbnail_image']}
                    />
                    <div onClick={() => savePost(post._id)}>
                        {post.isSave
                            ? <BookmarkIcon className={styles['bookmark-icon']} />
                            : <BookmarkBorderIcon className={styles['bookmark-icon']} />}
                    </div>


                </div>

                <div className={styles['content-more']}>
                    <p>
                        {formatTitle(post['title'])}
                    </p>
                    <div className={styles['container-avatar-user']}>
                        <img 
                            src={post['id_author']['avatar']}
                        />
                        <span>{`${post['id_author']['firstname']} ${post['id_author']['lastname']}`}</span>
                    </div>
                    <div className={`${styles['btn-heart']} ${post['isLike'] ? styles['active'] : ''}`}
                        onClick={() => reactPost(post._id)}
                    >
                        <FavoriteIcon style={{ color: "#FF0000", fontSize: "12px" }} />
                        <span>{post["numberLike"]}</span>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default ItemPost;
