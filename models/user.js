const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))
    return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = {
        name : Joi.string().required().min(5).max(50),
        email : Joi.string().required().min(5).max(252).email(),
        password : Joi.string().required().min(5).max(255),
    }
    return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser