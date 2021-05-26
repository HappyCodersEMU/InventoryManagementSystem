const Member = require('../models/member')
const User = require('../models/user')


module.exports = class MemeberService {

    static async addMember(data) {
        const { email, companyId, roleId } = data
        let userId = data.userId;

        if (typeof (userId) == 'undefined' || userId == null) {
            const user = await User.findOne({ email }).select("userId").exec()
            if (!user) {
                throw ({ status: 400, message: 'User with provided email not found' });
            }
            userId = user._id
            user.hasCompany = true
        }


        const member = new Member({
            user: userId,
            company: companyId,
            role: roleId,
        })

        await user.save()
        return await member.save()
    }

    static async getById(id) {
        const data = await Member.findById(id)
            .select("_id user company role")
            .exec()

        return data
    }

    static async getByCompanyId(companyId) {
        const data = await Member.find({ companyId })
            .select("_id user company  role")
            .populate('user', '-password -__v')
            .populate('role', '-__v')
            .populate('company', '-__v')
            .exec()

        return data
    }

    static async getAll() {
        const data = await Member.find()
            .select("_id user company  role")
            .exec()

        return data
    }

    static async search(searchQuery, limit) {
        const data = await Member.find(searchQuery)
            .select("_id user company  role")
            .populate('user', '-password -__v')
            .populate('role', '-__v')
            .populate('company', '-__v')
            .limit(limit)
            .exec()

        return data
    }


}