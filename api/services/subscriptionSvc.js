const Subscription = require('../models/subscription')

module.exports = class SubscriptionService {

    static async subscribe(data) {
        const { transPerMonth, numProducts, numMembers, description, price, name } = data

        const subscription = new Subscription({
            _id: new mongoose.Types.ObjectId(),
            name,
            price,
            description,
            transPerMonth,
            numProducts,
            numMembers
        })

        await subscription.save()

        return subscription._id
    }

    // ----------------------------------------------------------------------

    static async getSubscriptionPlanByName(name) {
        // TODO: make case-insensative search 
        const data = await Subscription.
            findOne({ name }).
            select("_id name transPerMonth numProducts numMembers")
            .exec()

        return data
    }

    static async getSubscriptionPlanById(id) {
        // TODO: make case-insensative search 
        const data = await Subscription.
            findById(id).
            select("_id name transPerMonth numProducts numMembers")
            .exec()

        return data
    }

    static async getAll() {
        // TODO: make case-insensative search 
        const data = await Subscription.
            find().
            select("_id name transPerMonth numProducts numMembers")
            .exec()

        return data
    }
}