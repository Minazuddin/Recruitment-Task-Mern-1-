const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');

const multer = require('multer');
const checkAuth = require('../middleware/checkAuth');


//fileFilter
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true); // accept image
    } else {
        cb(null, false); // reject image
    }
}

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, 'uploads/');
//         },
//         filename: (req, file, cb) => {
//             cb(null, file.originalname);
//         }
//     }),
//     limits: {
//         fileSize: 1024 * 1024 * 50
//     },
//     fileFilter: fileFilter
// });

const upload = multer({dest: 'uploads/'});

//Create Post

router.post('/:userId', checkAuth, upload.single('postImage'), (req, res, next) => {
    if(req.file) {
        User.findOne({_id: req.params.userId})
        .exec()
        .then(user => {
            const post = new Post({
                title: req.body.title,
                content: req.body.content,
                comments: [''],
                postImage: req.file.path,
                userId: user._id
            });
            post.save()
            .then(result => res.status(200).json({
                message: 'Post Created Successfully',
                postDetails: result
            }))
            .catch(err => {
                res.status(500).json({
                    message: err
                })
            });
        })
        
    } else {
        User.findOne({_id: req.params.userId})
        .exec()
        .then(user => {
            const post = new Post({
                title: req.body.title,
                content: req.body.content,
                comments: [],
                postImage: '',
                userId: user._id
            });
            post.save()
            .then(result => res.status(200).json({
                message: 'Post Created Successfully',
                postDetails: result
            }))
            .catch(err => {
                res.status(500).json({
                    message: err
                })
            });
        })
    }
    
    
});

//Get All Posts

router.get('/', checkAuth, (req, res, next) => {
    Post.find()
    .exec()
    .then(result => res.status(200).json({
        result
    }))
    .catch(err => res.status(500).json({
        message: err
    }))
})

//Get Single Posts

router.get('/single-post/:id',checkAuth , (req, res, next) => {
    Post.findOne({_id: req.params.id})
    .exec()
    .then(result => res.status(200).json({
        title: result.title,
        content: result.content,
        userId: result.userId
    }))
    .catch(err => res.status(500).json({
        message: err
    }))
})

router.get('/user-post/:userId',checkAuth , (req, res, next) => {
    Post.find({userId: req.params.userId})
    .exec()
    .then(result => res.status(200).json({
        message: result
    }))
    .catch(err => res.status(500).json({
        message: err
    }))
})

//Edit Post

router.patch('/:id', checkAuth, (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        const updatedPost = {};
        if(!req.body.comments) {
            updatedPost  = Object.assign(Post.findById(req.params.id), req.body);
        }
        if(req.file) {
            updatedPost["postImage"] = req.file.path;
        } 
        if(req.body.comments) {
            Post.findById(req.params.id)
                .exec()
                .then(result => 
                    {
                        result.comments.push(req.body.comments[0]);
                        update(result);
                    }
                )
                .catch(err => res.status(500).json({
                    message: err
                }))
        } 
        update(updatedPost);
        function update(updatedPost) {
            Post.updateOne({_id: req.params.id}, {$set: updatedPost})
            .then(result => res.status(200).json({
                message: 'Post Updated Successfully'
            }))
            .catch(err => res.status(500).json({
                message: err
            }))
        }
        
});

//Del Post

router.delete('/:id', checkAuth, (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
    .exec()
    .then(result => res.status(200).json({
        message: 'Post deleted Successfully'
    }))
    .catch(err => res.status(500).json({
        message: err
    }))
});

module.exports = router;