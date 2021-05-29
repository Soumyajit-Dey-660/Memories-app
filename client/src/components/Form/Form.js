import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography } from '@material-ui/core';
import { createPost, updatePost } from '../../actions/creators/posts';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    const post = useSelector(state => currentId ? state.posts.posts.find(post => post._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        if (currentId) 
            dispatch(updatePost(currentId, postData));
        else
            dispatch(createPost(postData));
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    return (
        <div>
            <Paper className={classes.paper}>
                <form 
                    autoComplete='off' 
                    noValidate 
                    className={`${classes.root} ${classes.form}`} 
                    onSubmit={handleSubmit}>
                        <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a memory</Typography>
                        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(event) => setPostData({...postData, creator: event.target.value})}
                        ></TextField>
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(event) => setPostData({ ...postData, title: event.target.value })}
                    ></TextField>
                    <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(event) => setPostData({ ...postData, message: event.target.value })}
                    ></TextField>
                    <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(event) => setPostData({ ...postData, tags: event.target.value.split(',') })}
                    ></TextField>
                    <div className={classes.fileInput}>
                        <FileBase 
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                        />
                    </div>
                    <Button className={classes.buttonSubmit} variant='contained' size='large' color='primary' type="submit" fullWidth>Submit</Button>
                    <Button variant='contained' size='small' color='secondary' onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </div>
    )
}

export default Form;
