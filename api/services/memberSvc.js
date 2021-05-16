const Member = require('../models/member')


module.exports = class MemeberService {

    static async addMember(data) {

        const { userID, companyID, roleID } = data

        const member = new Member({
            userID,
            companyID,
            roleID,
        })

        return await member.save()
    }

    static async getById(id) {
        const data = await Member.findById(id)
            .select("_id userID companyID roleID")
            .exec()

        return data
    }

    static async getByCompanyId(companyId) {
        const data = await Member.find({ companyId })
            .select("_id userID companyID  roleID")
            .exec()

        return data
    }

    static async getAll() {
        const data = await Member.find()
            .select("_id userID companyID  roleID")
            .exec()

        return data
    }

    static async search(searchQuery, limit) {
        const data = await Member.find(searchQuery)
            .select("_id userID companyID  roleID")
            .populate('userID roleID')
            .limit(limit)
            .exec()

        return data
    }


}