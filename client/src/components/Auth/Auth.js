import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AUTH } from '../../actions/types/auth';
import { signIn, signUp } from '../../actions/creators/auth';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';

import useStyles from './styles';

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const handleSubmit = event => {
        event.preventDefault();
        if (isSignedUp) {
            dispatch(signUp(formData, history));
        } else {
            dispatch(signIn(formData, history));
        }
    }
    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const handleShowPassword = () => {
        setShowPassword(prevPassword => !prevPassword);
    }
    const switchMode = () => {
        setIsSignedUp(prevIsSignedUp => !prevIsSignedUp);
        setShowPassword(false);
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({
                type: AUTH,
                payload: {
                    result,
                    token
                }
            })
            history.push('/');
        } catch(error) {
            console.log(error);
        }
    }
    const googleFailure = (error) => {
        console.log(error);
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignedUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignedUp && (
                            <>
                                <Input name='firstName' label="First Name" type='text' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label="Last Name" type='text' handleChange={handleChange} half />
                            </>
                        )}
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={ showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignedUp && (
                            <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type="password" />
                        )}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>{ isSignedUp ? 'Sign Up' : 'Sign In' }</Button>
                    <GoogleLogin 
                        clientId="1051833993640-l9f9bagssbtvs87v9e3pt9mop3i0fkm1.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button 
                                className={classes.googleButton} 
                                color='primary' 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />} 
                                variant='contained'
                            >Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>{ isSignedUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
