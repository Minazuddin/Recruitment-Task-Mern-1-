import React, { Component } from 'react'
import styles from './styles.module.css'

class PostBox extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        let postImageSrc = this.props.postImage ? this.props.postImage : "https://megatherm-dev.in/rba/wp-content/uploads/2019/02/noavatar-profile.jpg";
        return (
            <div>
                <div className={styles.postBox}>
                    <div>
                        <img src={postImageSrc}  className={styles.postImage}/>
                    </div>
                    <div className={styles.content}>
                        <h3>{this.props.title}</h3>
                        <p>{this.props.content}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostBox
