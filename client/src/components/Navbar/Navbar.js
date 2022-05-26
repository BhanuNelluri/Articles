import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import useStyles from './styles'
import memoriesLogo from '../../images/logo.png';
import memoriesText from '../../images/text.png';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/ActionTypes';
import decode from 'jwt-decode';


const Navbar = ({user,setUser,userArticles,setUserArticles}) => {
    console.log(userArticles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();


    const userlogout = () => {
        dispatch({ type: LOGOUT })
        history.push('/');
        setUser(null);
    }
   
    console.log(user);

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) userlogout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" onClick={()=>setUserArticles(false)} >
            <Typography  className={classes.logo} variant="h5">FATMUG</Typography>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.toolbar}>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={userlogout} >LogOut</Button>
                    </div>
                ) : (
                    <Button color="secondary" href="/auth" variant="contained"> SignIn</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;