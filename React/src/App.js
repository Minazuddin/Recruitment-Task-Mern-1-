import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import VerifyAccount from './components/VerifyAccount';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
        <div>
            <Router>
                    <Home />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/verify" component={VerifyAccount} />
            </Router>
        </div>
       )
    };
}

export default App;