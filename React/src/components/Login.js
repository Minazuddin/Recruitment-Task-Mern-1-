import React, { Component } from 'react'
import styles from './styles.module.css';
import {Redirect, Link} from 'react-router-dom';
import NavWithoutLogin from './NavWithoutLogin';

const linkStyle = {
    textDecoration: 'none'
}

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             password: '',
             isLoggedIn: false
        }
        
    this.inputHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    this.login = (event) => {
            event.preventDefault();
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data => {
            if(data.token) {
                sessionStorage.setItem('isLoggedIn', data.user.isLoggedIn);
                sessionStorage.setItem('userToken', data.user.token);
                sessionStorage.setItem('userId', data.user._id);
                this.setState({
                    isLoggedIn: true
                })
                
            }
            alert(data.message);
        })
        }
    }


    render() {
        const welcome = this.state.isLoggedIn ? <Redirect to="/create-post" />: '';
        return (
            <div>
                <NavWithoutLogin />
                <div className={styles.formContainer}>
                    <h1>LOGIN</h1>
                    <form className={styles.form}>
                        <input type="email" name="email" value={this.state.email} onChange={this.inputHandler} placeholder="abcd@abc.com" />
                        <input type="password" name="password" value={this.state.password} onChange={this.inputHandler} placeholder="password" />
                        <button className={styles.login} type="submit" onClick={this.login}>Login</button>                 
                    </form>
                    <Link to="/signup" style={linkStyle}>
                         <button className={styles.register}>Register</button>
                    </Link>
                </div>
                <div>
                    {welcome}
                </div>
            </div>
        )
    }
}

export default Login
