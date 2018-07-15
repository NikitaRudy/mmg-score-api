const mongoose = require('mongoose');

const isEmail = email =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());

const resultSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate(name) {
            return (typeof name === 'string' || name instanceof String)
            && name.length < 20 && name.length > 2;
        },
        message: '{VALUE} is not a valid username'
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
}, { timestamps: {} });

module.exports = mongoose.model('Result', resultSchema);