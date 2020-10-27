const express = require('express')
const User = require('../models/user')
const router = express.Router();

router.post('/:token', (req, res, next) => {

    User.findOneAndUpdate({token: req.params.token}, { $set: { isLoggedIn: false, token: '' }}, { useFindAndModify: false })
    .then(doc => {
        res.status(200).json({
            message: 'Logged Out Successfully!'
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err
        })
    })
});
        

module.exports = router;