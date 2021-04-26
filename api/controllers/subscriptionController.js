const SubscriptionPlanService = require("../services/subscriptionSvc");

module.exports = class Subscription {

    static async addSubscriptionPlan(req, res, next) {
        try {
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

    static async getById(req, res, next) {
        try {
            const data = await SubscriptionPlanService.getSubscriptionPlanById(req.params.id)
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

    static async getByName(req, res, next) {
        try {
            const data = await SubscriptionPlanService.getSubscriptionPlanByName(req.params.name)
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
}
