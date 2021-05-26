const User = require("../models/user");
const Company = require('../models/company')
const Role = require('../models/role')
const Member = require('../models/member')
const Subscription = require('../models/subscription')

module.exports = class CompanyService {

    /**
     * 
     * @param {*} data 
     * @returns 
     */
    static async createCompany(data) {
        const { companyName, planName, userId } = data

        const plan = await Subscription.findOne({ name: planName })
        const company = new Company({
            name: companyName,
            subscription: plan.get('_id')
        })

        const companyId = company.get('_id')
        const role = await Role.findOne({ roleName: 'admin' })
        const member = new Member({
            user: userId,
            company: companyId,
            role: role.get('_id')
        })

        const user = await User.findOne({ _id: userId })
        user.set({ hasCompany: true })

        await company.save()
        await user.save()
        await member.save()

        return { companyId, hasCompany: user.hasCompany }
    }

    // ----------------------------------------------------------------------

    static async getAll() {
        return await Company.find()
            .select("_id name subscription")
            .populate('subscription', '-__v')
            .exec()
    }

    static async getById(id) {
        return await Company
            .findById(id)
            .populate('subscription', '-__v')
            .exec()
    }
}