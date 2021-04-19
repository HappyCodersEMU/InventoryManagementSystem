const { Router } = require('express')
const router = Router()

const Company = require('../models/company')
const Subscription = require('../models/subscription')

router.get('/', async (req, res) => {

    try {
        const {name, subscriptionID} = req.body
        
        const subscription = await Subscription.findById(subscriptionID)

        const company = new Company({
            name,
            subscription,
        })

        console.log(company)

        await company.save()

        res.status(201).json({message: 'Company has been added'})

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong, try again' })
    }

})

module.exports = router;
