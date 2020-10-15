import React, { Component } from 'react'
import styles from './styles.module.css';

class VerifyAccount extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             token: ''
        }
     
    this.verify = (event) => {
                event.preventDefault();
                fetch(`http://localhost:5000/signup/${localStorage.getItem('token')}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                 }
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    alert(data.verified);
                })
            } 
        }


    render() {
        return (
            <div>
                <div className={styles.verifyFormContainer}>
                    <h1>VERIFY</h1>
                    <form className={styles.verifyForm}>
                        <button className={styles.verify} onClick={this.verify}>Verify</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default VerifyAccount
