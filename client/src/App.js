import React from 'react'
import { Container} from '@material-ui/core';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    return (
        <Router>
            <Container maxwidth='lg'>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/auth" component={Auth} />
                </Switch>
            </Container>    
        </Router>
    )
}

export default App
