const mongoose = require('mongoose');

const isEmail = email =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());

const resultSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    email: {
        type: String,
        required: true,
        validate: isEmail,
        message: '{VALUE} is not a valid email'
    },
    score: {
        type: Number,
        min: 0,
        required: true,
    }
});

module.exports = mongoose.model('Result', resultSchema);