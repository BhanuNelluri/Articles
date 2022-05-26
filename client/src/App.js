import React,{useState} from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PostDetails from './components/PostDetails/postDetails';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Form from './components/Form/Form';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const [userArticles, setUserArticles] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar user={user} setUser={setUser} userArticles={userArticles} setUserArticles={setUserArticles}/>
                <Switch>
                    <Route path='/' exact component={() => <Redirect to="/posts" />} />
                    <Route exact path="/posts">
                    <Home user={user} setCurrentId={setCurrentId} currentId={currentId} userArticles={userArticles} setUserArticles={setUserArticles}/>
                   </Route>
                    <Route exact path="/newArticle" >
                    <Form setCurrentId={setCurrentId} currentId={currentId} />
                   </Route>
                    <Route path='/posts/:id' exact component={PostDetails} />
                    <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                </Switch>

            </Container>
        </BrowserRouter>
    );
}

export default App;