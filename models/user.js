//const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    surname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    trips: [{
            type: Schema.Types.ObjectId,
            ref: 'offer'
        }],
    phone: {
        type: String,
        required: true
    },
    aboutMe: {
        type: String,
        required: false,
        maxlength: 1024
    },
    isAdmin:{
        type: Boolean
    },
    toAccept: [{
        type: Schema.Types.ObjectId,
        ref: 'offer'
    }]
    
});

const User = mongoose.model('user', userSchema);

module.exports = User;