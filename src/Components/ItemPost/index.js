import React from 'react';
import styles from './ItemPost.module.scss';
import {
    Avatar,
    Stack,
    Card,
    Typography,
    CardContent,
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
function ItemPost({ post, savePost, reactPost }) {
    const getDescription = () => {
        if (post['description']) return post['description'];

        return (
            post['ingredients'].map(ingredient => {
                return <span><b>{ingredient.name}</b>: {ingredient.quantity}<br /></span>
            })
        )
    }

    return (
        <div>
            <Card>
                <Stack direction="row" spacing={0.5}>
                    <Avatar
                        alt={post["id_author"]["firstname"]}
                        src={post["id_author"]["avatar"]}
                        sx={{ width: 24, height: 24 }}
                    />
                    <span>{`${post["id_author"]["lastname"]} ${post["id_author"]["firstname"]}`}</span>
                </Stack>
                <div className={styles['container-img-button']}>
                    <img
                        src={post['thumbnail_image']}
                        alt={post['thumbnail_image']}
                    />
                    <div onClick={() => savePost(post._id)}>
                    {post.isSave
                        ?<BookmarkIcon className={styles['bookmark-icon']} />
                        :<BookmarkBorderIcon className={styles['bookmark-icon']} />}
                    </div>


                </div>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {post['title']}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {getDescription()}
                    </Typography>
                    <div className={`${styles['btn-heart']} ${post['isLike'] ? styles['active'] : ''}`}
                        onClick={() => reactPost(post._id)}
                    >
                        <FavoriteIcon style={{ color: "#FF0000", fontSize: "12px" }} />
                        <span>{post["numberLike"]}</span>
                    </div>
                </CardContent>

            </Card>
        </div>
    )
}

export default ItemPost;
