import React, { useState } from 'react';
import { TextField, Button, Typegraphy, Paper, Typography } from '@material-ui/core';
import { createPost } from '../../actions/creators/posts';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './styles';

const Form = () => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(createPost(postData));
    }
    const clear = () => {

    }
    return (
        <div>
            <Paper className={classes.paper}>
                <form 
                    autoComplete='off' 
                    noValidate 
                    className={`${classes.root} ${classes.form}`} 
                    onSubmit={handleSubmit}>
                        <Typography variant='h6'>Creating a memory</Typography>
                        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(event) => setPostData({...postData, creator: event.target.value})}
                        ></TextField>
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(event) => setPostData({ ...postData, title: event.target.value })}
                    ></TextField>
                    <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(event) => setPostData({ ...postData, message: event.target.value })}
                    ></TextField>
                    <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(event) => setPostData({ ...postData, tags: event.target.value })}
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
