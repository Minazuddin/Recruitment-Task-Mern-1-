const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: [{
        message: {type: String}
    }],
    postImage: { type: String }
})

module.exports = mongoose.model('Post', postSchema);