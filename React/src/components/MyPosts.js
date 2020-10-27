import React, { Component } from 'react'
import NavWithLogin from './NavWithLogin'
import PostBox from './PostBox'
import styles from './styles.module.css'

let userPosts;

let postBoxComponent;
    
class MyPosts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             postBoxComponent: ''
        }
    }
    
    render() {
        window.onload = () => {
            fetch(`http://localhost:5000/post/user-post/${sessionStorage.getItem('userId')}`,{
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem('userToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            userPosts = data.message;
            postBoxComponent = userPosts.map(post => <PostBox title={post.title} content={post.content} postImage={post.postImage} />);
            this.setState({
                postBoxComponent: postBoxComponent
            })
        })
    }
        alert(this.state.postBoxComponent)
        return (
            <div>
                <NavWithLogin />
                <div className={styles.myPostContainer}>
                    {this.state.postBoxComponent}
                </div>
            </div>
        )
    }
}

export default MyPosts
