const SubscriptionPlanService = require("../services/subscriptionSvc");
const { check, validationResult } = require('express-validator');

module.exports = class Subscription {

    static async addSubscriptionPlan(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const data = await SubscriptionPlanService.addSubscriptionPlan(req.body)
            res.status(201).json(data)

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }


    static async getAll(req, res, next) {
        try {
            const data = await SubscriptionPlanService.getAll()
            res.status(200).json(data)

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }

    static async getById(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const data = await SubscriptionPlanService.getSubscriptionPlanById(req.params.id)
            res.status(200).json(data)

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }

    static async getByName(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: errors.array()[0].msg })
            }

            const data = await SubscriptionPlanService.getSubscriptionPlanByName(req.params.name)
            res.status(200).json(data)

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }


    /**
      * validates the passed fields.
      * @param {string} method - The method name to be validated.
      */
    static validate(method) {
        switch (method) {
            case 'addSubscriptionPlan': {
                return [
                    check('name', 'name cannot be empty').notEmpty(),
                    check('transPerMonth', 'transPerMonth cannot be empty').notEmpty().isNumeric(),
                    check('numProducts', 'numProducts cannot be empty').notEmpty().isNumeric(),
                    check('numMembers', 'numMembers cannot be empty').notEmpty().isNumeric(),
                    check('price', 'price cannot be empty').notEmpty(),
                ]
            }
            case 'getById': {
                return [
                    check('id', 'id is empty or invalid').notEmpty().isMongoId()
                ]
            }
            case 'getByName': {
                return [
                    check('name', 'name is empty or invalid').notEmpty()
                ]
            }
        }
    }

}
