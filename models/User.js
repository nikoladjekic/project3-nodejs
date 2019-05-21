const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const validator = require('validator');

let UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'This field must be filled'],
        unique: true,
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
        // validation: [validateEmail, 'You must enter a valid email']
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'This field must be filled'],
        trim: true,
        //validate: [validatePass, 'You password must be atleast 8 characters long']
    },
    subscription: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

UserSchema.pre('save', function (next) {

    if (this.password && this.isModified('password') && this.password.length >= 8) {
        this.salt = crypto.randomBytes(32).toString('base64');

        this.password = this.setPassword(this.password);

        next();

    }

});


UserSchema.methods.setPassword = function (password) {
    if (this.salt && password) {

        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    } else {

        return password;
    }
};

UserSchema.methods.validPassword = function (userPassword, hashPassword, s) {

    var salt = s;
    var hash = crypto.pbkdf2Sync(userPassword, new Buffer(salt, 'base64'), 10000, 64, 'sha1').toString('base64');
    return hashPassword === hash;
};


let User = mongoose.model('User', UserSchema);

module.exports = User;