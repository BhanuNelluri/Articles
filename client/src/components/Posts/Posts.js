import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post.js';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core';

const Posts = ({ setCurrentId,userArticles,setUserArticles }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();
    if (!posts.length && !isLoading) return 'No Posts';
    const userPosts =  posts.filter((post) => post.creator === String(user?.result?._id));
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {userArticles?userPosts.map((post) => (
                    <Grid key={post._id} item lg = {6} md = {6} sm = {12} xs = {12}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                )): posts.map((post) => (
                    <Grid key={post._id} item lg = {6} md = {6} sm = {12} xs = {12}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))
                }

            </Grid >
        )

    );
}

export default Posts;