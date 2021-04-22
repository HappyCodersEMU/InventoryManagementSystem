const { Router } = require('express')
const router = Router()
const Role = require('../models/role')

router.post('/', async (req, res) => {
    try {
        const { roleName, feature1, feature2, feature3, feature4 } = req.body
        const role = new Role({
            roleName,
            tempNameFeature1: feature1,
            tempNameFeature2: feature2,
            tempNameFeature3: feature3,
            tempNameFeature4: feature4
        })
        await role.save()
        res.status(201).json({message: 'Role has been created'})
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong, try again' })
    }
})

module.exports = router;