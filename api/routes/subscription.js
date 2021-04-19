const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')
const url = require('url');

const Subscription = require('../models/subscription')

router.post('/', async (req, res) => {
    try {
        const { transPerMonth, numProducts, numMembers, description, name } = req.body

        const subscription = new Subscription({
            _id: new mongoose.Types.ObjectId(),
            name,
            description,
            transPerMonth,
            numProducts,
            numMembers
        })

        await subscription.save()

        res.status(201).json({ message: 'Subscription type has been added' })

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
})
