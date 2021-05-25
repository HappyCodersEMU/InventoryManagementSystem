const RoleService = require("../services/roleSvc");
const { check, validationResult } = require('express-validator');

module.exports = class Role {

    static async addRole(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const data = await RoleService.addRole(req.body)
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
            const data = await RoleService.getAll()
            res.status(200).json(data)

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
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const data = await RoleService.getById(req.params.id)
            res.status(200).json(data)

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }

    /**
    * validates the passed fields.
    * @param {string} method - The method name to be validated.
    */
    static validate(method) {
        switch (method) {
            case 'addRole': {
                return [
                    check('roleCode', 'Role code cannot be empty').notEmpty().isNumeric(),
                    check('roleName', 'Role name cannot be empty').notEmpty(),
                ]
            }
            case 'getById': {
                return [
                    check('id', 'id is empty or invalid').notEmpty().isMongoId()
                ]
            }
        }
    }
}
