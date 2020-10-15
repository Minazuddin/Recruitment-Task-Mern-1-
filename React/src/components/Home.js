import React from 'react'
import {Link} from 'react-router-dom';
import styles from './styles.module.css';

const linkStyle = {
    textDecoration: 'none'
}

function Home() {
    return (
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
                <ul>
                    <Link to="/login" style={linkStyle}> 
                        <li>Login</li>
                    </Link>
                    <Link to="/signup" style={linkStyle}>
                        <li>Sign Up</li>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}

export default Home