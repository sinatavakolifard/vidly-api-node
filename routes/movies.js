const auth = require('../middleware/auth')
const {Movie, validate, Genre} = require('../models/movies')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

mongoose.set('useFindAndModify', false)

router.get('/', async (req, res) => {
    const movie = await Movie.find().sort('title')
    res.send(movie)
})

router.post('/', auth, async (req, res) => {
    // validation
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).send('Invalid genre...')

    const movie = new Movie({ 
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    await movie.save()

    res.send(movie)
})

router.put('/:id', auth, async (req, res) => {
    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).send('Invalid genre...')

    const movie = await Movie.findByIdAndUpdate(req.params.id, { 
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true})

    if (!movie) res.status(404).send("Your ID not found!")
    
    res.send(movie)
})

router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)

    if (!movie) res.status(404).send("Your ID not found!")
    
    res.send(movie)
})


router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)

    if (!movie) res.status(404).send("Your ID not found!")
    
    res.send(movie)
})

module.exports = router