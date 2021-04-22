const { Router } = require('express')
const router = Router()

const Company = require('../models/company')
const Role = require('../models/role')
const Member = require('../models/member')
const Subscription = require('../models/subscription')
const User = require('../models/user')

router.post('/create', async (req, res) => {
    try {
        const { companyName, planName, userId} = req.body
        const plan = await Subscription.findOne({ name: planName })
        const company = new Company({
            name: companyName,
            subscriptionID: plan.get('_id')
        })
        const companyId = company.get('_id')
        const role = await Role.findOne({ roleName: 'admin' })
        const member = new Member({
            userID: userId,
            companyID: companyId,
            roleID: role.get('_id')
        })
        const user = await User.findOne({ _id: userId })
        user.set({ hasCompany: true })
        await company.save()
        await user.save()
        await member.save()
        res.status(201).json({ message: 'Company and Initial Admin have been added', hasCompany: user.hasCompany })
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
