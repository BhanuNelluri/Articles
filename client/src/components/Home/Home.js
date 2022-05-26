import React, { useState, useEffect } from 'react';
import { Grow, Grid, Container, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { Typography, CircularProgress, Divider } from '@material-ui/core/';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = ({ user,currentId, setCurrentId,userArticles,setUserArticles }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const posts = useSelector((state) => state.posts);
    const recommendedPosts = posts.posts.filter(({likes})=>likes?.length>=4);
    console.log(recommendedPosts.length);
    const openPost = (_id) => history.push(`/posts/${_id}`);
    const userBased = () => {
        setUserArticles(true);
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                
                {user && (
                    <div className={classes.header}>
                    <div >
                        <Typography  variant="h6">Greetings | {user.result.name}</Typography>
                    </div>
                    <div>
                <Button style={{marginRight:"20px"}} color="primary" href="/newArticle" variant="contained">Write</Button>
                 <Button variant="contained"  color="inherit" onClick={userBased} >Your Articles</Button>
                </div>
                </div>

                ) }
                
                <Grid container justify="space-between" alignItems="stretch" className={classes.gridContainer} spacing={3}>
                    <Grid item xs={12} sm={8} md={9}>
                        <Posts setCurrentId={setCurrentId} userArticles={userArticles} setUserArticles={setUserArticles} />
                        <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                    </Grid>
                    
                    <Grid item xs={12} sm={4} md={3}>
                    {recommendedPosts.length && (
                <div >
                    <Divider />
                    <Typography gutterBottom variant="h5">Top Articles</Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                            <div style={{ margin: '10px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img src={selectedFile} width="200px" />
                                <Divider style={{marginTop:'10px'}}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;
