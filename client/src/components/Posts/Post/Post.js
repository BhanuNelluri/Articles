import React from 'react';
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import { ThumbUpAlt, ThumbUpAltOutlined, Delete, MoreHoriz } from '@material-ui/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletepost, likepost } from '../../../actions/posts'
import { useHistory } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useHistory();

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?._id))
                ? (
                    <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = (e) => {
        history.push(`/posts/${post._id}`);
    };
    const likePost = () =>{
        const index = post.likes.findIndex((id) => id === String(user?.result?._id));
        if (index === -1) {
            post.likes.push(user?.result?._id);
        } else {
            post.likes = post.likes.filter((id) => id !== String(user?.result?._id));
        }
        dispatch(likepost(post));
    }
    const EditButton = () =>{
        setCurrentId(post._id);
        history.push(`/newArticle`);
    }

    return (
        <Card className={classes.card}>
            <ButtonBase
                component="span"
                name="test"
                className={classes.cardAction}
                onClick={openPost}
            >
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            </ButtonBase>
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.created).fromNow()}</Typography>
            </div>
            {
                (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size="small" onClick={EditButton}>
                        <MoreHoriz fontSize="default" />
                    </Button>
                </div>
            }

            
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography className={classes.message} variant="body2" color="textSecondary" gutterBottom>{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" component="p" disabled={!user?.result} onClick={likePost}>
                    <Likes />
                </Button>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                    <Button size="small" color="primary" onClick={() => dispatch(deletepost(post._id))}>
                        <Delete fontSize="small" />
                        Delete
                    </Button>
                }

            </CardActions>

        </Card>
    );
}

export default Post;

