const validateObjectId = require('../middleware/validateObjectId')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const {Genre, validate} = require('../models/genres')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres)
})

router.post('/', auth, async (req, res) => {
    // validation
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = new Genre({ name: req.body.name})
    await genre.save()

    res.send(genre)
})

router.put('/:id', auth, async (req, res) => {
    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, { new: true})

    if (!genre) res.status(404).send("Your ID not found!")
    
    res.send(genre)
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id)

    if (!genre) res.status(404).send("Your ID not found!")
    
    res.send(genre)
})


router.get('/:id', validateObjectId, async (req, res) => {
    
    const genre = await Genre.findById(req.params.id)

    if (!genre) res.status(404).send("Your ID not found!")
    
    res.send(genre)
})

module.exports = router