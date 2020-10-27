import React, { Component } from 'react'
import NavWithLogin from './NavWithLogin'
import styles from './styles.module.css'

let userToken = sessionStorage.getItem('userToken');

class CreatePost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             title: '',
             content: '',
             coverImage: ''
        }
    }

    inputChangeHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    createPost = (event) => {
        event.preventDefault();
        fetch(`http://localhost:5000/post/${sessionStorage.getItem('userId')}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            this.setState({
                title: '',
                content: '',
                coverImage: ''
            })
        })
    }

    render() {
        return (
            <div>
                <NavWithLogin />
                <div className={styles.createPostContainer}>
                    <form className={styles.postForm}>
                        <h2>CREATE POST</h2>
                        <input type="text" name="title" value={this.state.title} onChange={this.inputChangeHandler} className={styles.postTitle} placeholder="Your title goes here" />
                        <textarea name="content" value={this.state.content} onChange={this.inputChangeHandler} className={styles.postContent} placeholder="your content goes here" />
                        <div className={styles.postFormButton}>
                            <input type="file" name="coverImage" value={this.state.coverImage} onChange={this.inputChangeHandler} className={styles.postImage} />
                            <button className={styles.createPostButton} onClick={this.createPost}>create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreatePost
