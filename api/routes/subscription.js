const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')

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

router.get('/', async (req, res) => {
    try {
        const data = await Subscription.find().
            select("_id name transPerMonth numProducts numMembers").exec()

        res.status(201).json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
})


router.get('/search', async (req, res) => {
    try {
        const params = req.query
        
        // TODO: make case-insensative search 
        const data = await Subscription.
            find({ name: params.name }).
            select("_id name transPerMonth numProducts numMembers").exec()

        res.status(201).json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const data = await Subscription.
            findById(req.params.id).
            select("_id name transPerMonth numProducts numMembers").exec()

        res.status(201).json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
})


module.exports = router;
