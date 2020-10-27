import React, { Component } from 'react'
import styles from './styles.module.css';
import {Redirect} from 'react-router-dom';
import NavWithoutLogin from './NavWithoutLogin';

class Signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             password: '',
             confirmPassword: '',
             isRegistered: false
        }
        
    this.inputHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    this.signup = (event) => {
            event.preventDefault();
        if(this.state.password === this.state.confirmPassword) {
            fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
            })
            .then(response => response.json())
            // .then(data => localStorage.setItem("token", data.userDetails.token))
            .then(data => {
                alert(data.message);
                if(data.userDetails) {
                    localStorage.clear();
                    localStorage.setItem('token', data.userDetails.token);
                    this.setState({
                        isRegistered: true
                    })
                }
            })
            } else {
                alert("Password did not match")
            }
        }
    }
    
    render() {
        const redirect = this.state.isRegistered ? <Redirect to="/verify" /> : '';
        return (
            <div>
                <NavWithoutLogin />
                <div className={styles.formContainer}>
                    <h1>SIGN UP</h1>
                    <form className={styles.form}>
                        <input type="email" name="email" value={this.state.email} onChange={this.inputHandler} placeholder="abcd@abc.com" />
                        <input type="password" name="password" value={this.state.password} onChange={this.inputHandler} placeholder="password" />
                        <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.inputHandler} placeholder="confirmPassword" />               
                    </form>
                    <button className={styles.register} onClick={this.signup}>Register</button>
                </div>
                <div>{redirect}</div>
            </div>
        )
    }
}

export default Signup
