const {Customer, validate} = require('../models/customers')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers)
})

router.post('/', async (req, res) => {
    // validation
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    })
    await customer.save()

    res.send(customer)
})

router.put('/:id', async (req, res) => {
    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, { new: true})

    if (!customer) res.status(404).send("Your ID not found!")
    
    res.send(customer)
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)

    if (!customer) res.status(404).send("Your ID not found!")
    
    res.send(customer)
})


router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer) res.status(404).send("Your ID not found!")
    
    res.send(customer)
})

module.exports = router