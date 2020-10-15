const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken');

//sign up

router.post('/', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(result => {
        if(result.length >= 1) {
            return res.status(409).json({
                message: "Email Already exist!"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    res.status(401).json({
                        message: err
                    });
                } else {
                    const user = new User({
                        id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        token: jwt.sign({
                            email: req.body.email,
                            password: req.body.password
                        }, process.env.SECRET_KEY,
                        {
                            expiresIn: '1d'
                        }),
                        verified: false
                    });
                    user.save()
                    .then(result => {
                        console.log(user);
                        res.status(200).json({
                            message: "Account Created Successfully",
                            userDetails: {
                                email: result.email,
                                token: result.token
                            }
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: err
                        });
                    });
                }
            });
        }
    });
});

router.post('/:token', (req, res, next) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.SECRET_KEY);
        if(decoded) {
            User.updateOne({token: req.params.token}, {$set: {verified: true}})
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'User Verified Successfully!',
                    user: result,
                    verified: result.verified
                })
            });
        }
    } catch(err) {
        res.status(401).json({
            message: 'Auth failed'
        });
    }
})

module.exports = router;