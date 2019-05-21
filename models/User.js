const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validator = require('validator');

let UserSchema = new Schema({
    username: {
       type: String,
        required: [true, 'This field must be filled'],
        trim: true
    },
    firstName: {
        type: String,
        required: [true, 'This field must be filled'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'This field must be filled'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'This field must be filled'],
        trim: true,
        validation: [validateEmail, 'You must enter a valid email']
    },
    salt:{
        type: String
    },
    password: {
        type: String,
        required: [true, 'This field must be filled'],
        trim: true,
        validate: [validatePass, 'You password must be atleast 8 characters long']
    },
    subscription:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

let User = mongoose.model('User', UserSchema);

module.exports = User;