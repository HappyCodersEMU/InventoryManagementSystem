const Member = require('../models/member')
const User = require('../models/user')


module.exports = class MemeberService {

    static async addMember(data) {
        const { email, companyID, roleID } = data
        let userID = data.userID;

        if (typeof(userID) == 'undefined' || userID == null ) {
           const user = await User.findOne({ email }).select("userID").exec()
            if (!user) {
                throw ({ status: 400, message: 'User with provided email not found' });
            }
            userID = user._id
        }


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