const Role = require('../models/role')


module.exports = class RoleService {

    static async addRole(data) {

        const { roleName, roleCode } = data

        const role = new Role({
            roleCode,
            roleName,
        })

        return await role.save()
    }

    static async getById(id) {
        const data = await Role.findById(id)
            .select("_id roleCode roleName")
            .exec()

        return data
    }

    static async getAll() {
        const data = await Role.find()
            .select("_id roleCode roleName")
            .exec()

        return data
    }

}