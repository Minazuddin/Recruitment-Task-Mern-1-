import React from 'react'
import {Link} from 'react-router-dom';
import styles from './styles.module.css';
import NavWithoutLogin from './NavWithoutLogin';
import NavWithLogin from './NavWithLogin'

const linkStyle = {
    textDecoration: 'none'
}

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
             reload: true
        }
        this.isLoggedIn = sessionStorage.getItem('isLoggedIn');
    }
    render() {
        let navBar; 
        
        // const navBar = this.state.isLoggedIn ? <NavWithLogin /> : <NavWithoutLogin />;
        
            if(this.isLoggedIn) {
                navBar = <NavWithLogin />
            } else {
                navBar = <NavWithoutLogin />
            }
        return (
            <div>
                {navBar}
            </div>
        )
    }
    
}

export default Home