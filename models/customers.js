const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
    isGold: {type: Boolean, default: false},
    name: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        require: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    }
})

const Customer = mongoose.model('Customer', customerSchema)

function ValidateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean(),
        name : Joi.string().required().min(5).max(50),
        phone : Joi.string().required().min(5).max(50)
    }
    return Joi.validate(customer, schema)
}

exports.Customer = Customer
exports.validate = ValidateCustomer