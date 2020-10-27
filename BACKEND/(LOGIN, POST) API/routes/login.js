const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt');
const router = express.Router()
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, 
            (err, result) => {
                if(result) {
                    if(user.verified) {
                        User.findOneAndUpdate({email: user.email}, {$set: {token: jwt.sign(
                            {
                                email: user.email,
                                password: user.password
                            },
                            process.env.SECRET_KEY,
                            {
                                expiresIn: '1d'
                            }
                         ),
                         isLoggedIn: true
                        },
                        
                        }, { useFindAndModify: false})
                        .then(doc => {
                            return res.status(200).json({
                                message: 'Logged In Successfully',
                                token: doc.token,
                                user: doc
                            });
                        })
                    } else {
                        console.log(user)
                        return res.status(201).json({
                            message: 'User Not Verified'
                        })
                    }
                } else {
                        return res.status(401).json({
                            message: 'Auth failed'
                        })
                }
            })
        } else {
            return res.status(500).json({
                message: 'Auth failed'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
});

module.exports = router;