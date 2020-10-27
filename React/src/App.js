import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import VerifyAccount from './components/VerifyAccount';
import CreatePost from './components/CreatePost';
import MyPosts from './components/MyPosts';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


class App extends React.Component {
    constructor(props) {
        super(props)

            this.state = {
                isLoggedIn: false    
            }
        }

    changeLoginState = (isLoggedIn) => {
        this.setState({
            isLoggedIn: isLoggedIn
        })
    }

    render() {
        // let protectedPostComponent, protectedPostPath, navBar;
        // if(this.state.isLoggedIn) {
        //     protectedPostComponent = CreatePost;
        //     protectedPostPath = '/create-post';
        //     navBar = <NavWithLogin changeLoginState={this.changeLoginState}/>
        // } else {
        //     protectedPostComponent = NavWithoutLogin;
        //     protectedPostPath = '/';
        //     navBar = <NavWithoutLogin />
        // }
        return (
        <div>
            <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/login" >
                            <Login changeLoginState={this.changeLoginState} />
                        </Route>
                        <Route path="/signup" component={Signup} />
                        <Route path="/verify" component={VerifyAccount} />
                        <Route path="/create-post" component={CreatePost} />
                        <Route path="/my-posts" component={MyPosts} />
                        {/* <Route path={protectedPostPath} component={protectedPostComponent} /> */}
                    </Switch>
            </Router>
        </div>
       )
    };
}

export default App;