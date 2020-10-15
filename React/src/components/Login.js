import React, { Component } from 'react'
import styles from './styles.module.css';

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             password: ''
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
                localStorage.setItem('myToken', data.token);
            }
            alert(data.message);
            alert(data.user.verified);
        })
        }
    }


    render() {
        return (
            <div>
                <div className={styles.formContainer}>
                    <h1>LOGIN</h1>
                    <form className={styles.form}>
                        <input type="email" name="email" value={this.state.email} onChange={this.inputHandler} placeholder="abcd@abc.com" />
                        <input type="password" name="password" value={this.state.password} onChange={this.inputHandler} placeholder="password" />
                        <button className={styles.login} type="submit" onClick={this.login}>Login</button>                 
                    </form>
                    <button className={styles.register}>Register</button>
                </div>
            </div>
        )
    }
}

export default Login
