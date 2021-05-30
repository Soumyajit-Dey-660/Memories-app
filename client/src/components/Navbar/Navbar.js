import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../actions/types/auth';
import decode from 'jwt-decode';
import memories from '../../images/memo.jpg';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const logout = () => {
        dispatch({
            type: LOGOUT 
        })
        history.push('/');
        setUser(null);
    }
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])
    
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer} >
            <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories</Typography>
            <img className={classes.image} src={memories} alt='memories' height='60' />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.data.name} src={user.data.imageUrl}>{user.data.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.data.name}</Typography>
                        <Button className={classes.logout} color="secondary" variant="contained" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" color="primary" variant="contained">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;