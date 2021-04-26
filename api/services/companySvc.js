const User = require("../models/user");
const Company = require('../models/company')
const Role = require('../models/role')
const Member = require('../models/member')
const Subscription = require('../models/subscription')

module.exports = class CompanyService {

    static async createCompany(data) {
        const { companyName, planName, userId } = data

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

        return { message: 'Company and Initial Admin have been added', hasCompany: user.hasCompany }
    }

    // ----------------------------------------------------------------------

    static async getAll() {
        return await Company.find()
            .select("_id name subscriptionID")
            .populate('subscriptionID', '-__v')
            .exec()
    }

    static async getById(id) {
        return await Company
            .findById(id)
            .populate('subscriptionID', '-__v')
            .exec()
    }
}