const mongoose = require('mongoose')

//Create token blacklist schema

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
})

const blacklist = mongoose.model('token_blacklist', blacklistSchema)

module.exports = blacklist