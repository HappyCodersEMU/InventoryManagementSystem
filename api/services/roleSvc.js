const Role = require('../models/role')


module.exports = class RoleService {

    static async addRole(data) {

        const { roleName, feature1, feature2, feature3, feature4 } = data
        console.log(feature3)

        const role = new Role({
            roleName,
            tempNameFeatureOne: feature1,
            tempNameFeatureTwo: feature2,
            tempNameFeatureThree: feature3,
            tempNameFeatureFour: feature4
        })

        return await role.save()
    }

    static async getById(id) {
        const data = await Role.findById(id)
            .select("_id roleName tempNameFeatureOne  tempNameFeatureTwo tempNameFeatureThree")
            .exec()

        return data
    }

    static async getAll() {
        const data = await Role.find()
            .select("_id roleName tempNameFeatureOne  tempNameFeatureTwo tempNameFeatureThree")
            .exec()

        return data
    }

}