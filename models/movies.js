const {Genre, genreSchema} = require('./genres')
const mongoose = require('mongoose')
const Joi = require('joi')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

const Movie = mongoose.model('Movie', movieSchema)

function validateMovie(movie) {
    const schema = {
        title : Joi.string().required().min(3),
        genreId : Joi.objectId().required(),
        numberInStock : Joi.number().required(),
        dailyRentalRate : Joi.number().required()
    }
    return Joi.validate(movie, schema)
}

exports.Movie = Movie
exports.validate = validateMovie
exports.Genre = Genre