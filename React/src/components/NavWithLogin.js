import React from 'react'
import {Link} from 'react-router-dom';
import styles from './styles.module.css';
import { Redirect } from 'react-router-dom'

const linkStyle = {
    textDecoration: 'none'
}

const user = sessionStorage.getItem('userDetails');

class NavWithLogin extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             logout: false
        }
    }
    
    logOut = () => {
        fetch(`http://localhost:5000/logout/${user.token}`,{
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            this.setState({
                logout: true
            });
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userId');
        })
    }

    render() {
        const redirectingComponent = this.state.logout? <Redirect to="/" /> : '';
    return (
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
                <ul>
                    <Link to="/" style={linkStyle}> 
                        <li>Home</li>
                    </Link>
                    <Link to="/create-post" style={linkStyle}> 
                        <li>Create Post</li>
                    </Link>
                    <Link to="/my-posts" style={linkStyle}>
                        <li>My Posts</li>
                    </Link>
                        <li onClick={this.logOut}>LOG OUT</li>
                </ul>
            </nav>
            <div>
                {redirectingComponent}
            </div>
        </div>
        )
    }
}

export default NavWithLogin