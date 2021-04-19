const { Router } = require('express')
const router = Router()

const Company = require('../models/company')

router.post('/', async (req, res) => {
    try {
        const { name, subscriptionID } = req.body

        const company = new Company({
            name,
            subscriptionID: subscriptionID
        })
        await company.save()

        res.status(201).json({ message: 'Company has been added' })

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
})


router.get('/', async (req, res) => {
    try {
        const data = await Company.find().select("_id name subscriptionID").populate('subscriptionID', '-__v').exec()

        res.status(201).json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
})

router.get('/search', async (req, res) => {
    try {
        const name = req.query.name

        const data = await Company.find({ name }).populate('subscriptionID', '-__v').exec()

        res.status(201).json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const data = await Company.findById(req.params.id).populate('subscriptionID', '-__v').exec()

        res.status(201).json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
})


module.exports = router;
