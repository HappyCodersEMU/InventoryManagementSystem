const User = require('../models/user')

module.exports = class UserService {

    static async getById(id) {
        const data = await User.findById(id)
            .select("_id email name surname hasCompany")
            .exec()

        return data
    }

    static async getByEmail(email) {
        const data = await User.findOne({ email })
            .select("_id email name surname hasCompany")
            .exec()

        return data
    }

    static async search(searchQuery, limit) {
        const data = await User.find(searchQuery)
            .select("_id email name surname hasCompany")
            .limit(limit)
            .exec()

        console.log(searchQuery)

        return data
    }


}