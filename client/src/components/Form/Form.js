import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { createPost, updatepost } from '../../actions/posts';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', selectedFile: '',likes:[] });
    const history = useHistory();
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) =>
        p._id === currentId
    ) : null)
    const { isLoading } = useSelector((state) => state.posts);
    console.log(isLoading);
    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
             dispatch(updatepost(history,currentId, { ...postData, name: user?.result?.name }));
        } else {
            dispatch(createPost(history,{ ...postData, name: user?.result?.name }));
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', selectedFile: '',likes:[] })
    }


    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Edit" : "Creat"} Your Article</Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Content"
                    fullWidth
                    multiline
                    rows={8}
                    maxRows={Infinity}
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                
                <Button className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >{isLoading ? <div><CircularProgress fontSize="small" /></div> : (
                    <div>
                        Submit
                    </div>
                )}</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth
                >Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;